import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from "@react-navigation/native";
import { auth } from "../services/firebaseConfig";
import { updateProfile, updateEmail } from "firebase/auth";
import { useAuth } from "../Context/AuthContext.js"; 
import * as ImagePicker from 'expo-image-picker';
import ModalImagePicker from '../components/ModalImagePicker';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtpwqrhtc/image/upload';
const UPLOAD_PRESET = 'IMAGESANTIAGO';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { user, setUser } = useAuth();
  const [imageUri, setImageUri] = useState(null);
  const defaultImage = 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png';
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    setImageUri(user?.photoURL || defaultImage);
  }, [user]);

  const handleChooseImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        return showMessage({
          message: 'Permiso denegado',
          description: 'Se necesita permiso para acceder a la galería',
          type: 'danger'
        });
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
      });

      if (result.canceled) return;

      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      await uploadImage(base64Image);
    } catch (error) {
      console.error('Error seleccionando la imagen:', error);
      showMessage({
        message: 'Error',
        description: 'Ocurrió un error al intentar seleccionar la imagen',
        type: 'danger',
      });
    }
  };

  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        return showMessage({
          message: 'Permiso denegado',
          description: 'Se necesita permiso para usar la cámara',
          type: 'danger'
        });
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
        base64: true,
      });

      if (result.canceled) return;

      const base64Image = `data:image/jpeg;base64,${result.base64}`;
      await uploadImage(base64Image);
    } catch (error) {
      console.error('Error tomando la foto:', error);
      showMessage({
        message: 'Error',
        description: 'Ocurrió un error al intentar tomar la foto',
        type: 'danger',
      });
    }
  };

  const uploadImage = async (base64Image) => {
    if (!user || !base64Image) return;

    try {
      const formData = new FormData();
      formData.append('file', base64Image);
      formData.append('upload_preset', UPLOAD_PRESET);

      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.secure_url) {
        await updateProfile(auth.currentUser, {
          photoURL: data.secure_url,
        });

        setUser({ ...user, photoURL: data.secure_url });
        setImageUri(data.secure_url);

        showMessage({
          message: 'Éxito',
          description: 'Foto de perfil actualizada correctamente',
          type: 'success',
        });
      } else {
        throw new Error(data.error?.message || 'No se pudo obtener la URL de la imagen');
      }
    } catch (error) {
      showMessage({
        message: 'Error',
        description: error.message,
        type: 'danger',
      });
    }
  };

  const handleChangeName = async () => {
    if (!newName.trim()) return;

    if (!auth.currentUser) {
      return showMessage({
        message: "Error",
        description: "Usuario no autenticado",
        type: "danger",
      });
    }

    try {
      await updateProfile(auth.currentUser, { displayName: newName });
      showMessage({
        message: "Nombre actualizado correctamente",
        type: "success",
      });
      setNewName('');
    } catch (error) {
      console.error('Error al cambiar el nombre:', error);
      showMessage({
        message: "Error al actualizar el nombre",
        description: error.message,
        type: "danger",
      });
    }
  };

  const handleChangeEmail = async () => {
    if (!newEmail.trim()) return;

    if (!auth.currentUser) {
      return showMessage({
        message: "Error",
        description: "Usuario no autenticado",
        type: "danger",
      });
    }

    try {
      await updateEmail(auth.currentUser, newEmail);
      showMessage({
        message: "Correo actualizado correctamente",
        type: "success",
      });
      setNewEmail('');
    } catch (error) {
      console.error('Error al cambiar el correo electrónico:', error);
      showMessage({
        message: "Error al actualizar el correo",
        description: error.message,
        type: "danger",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes de Cuenta</Text>

      <TouchableOpacity onPress={() => setImageModalVisible(true)}>
        <Image source={{ uri: imageUri }} style={styles.profileImage} />
        <Text style={styles.editText}>Cambiar Foto</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Nuevo nombre"
        value={newName}
        onChangeText={setNewName}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleChangeName}>
        <Text style={styles.buttonText}>Cambiar Nombre</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Nuevo correo"
        value={newEmail}
        onChangeText={setNewEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleChangeEmail}>
        <Text style={styles.buttonText}>Cambiar Correo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginTop: 10 }]}
        onPress={() => setShowChangePassword(true)}
      >
        <Text style={styles.buttonText}>Cambiar Contraseña</Text>
      </TouchableOpacity>

      {/* Modal para elegir imagen */}
      <ModalImagePicker
        visible={isImageModalVisible}
        onClose={() => setImageModalVisible(false)}
        onChooseImage={handleChooseImage}
        onTakePhoto={handleTakePhoto}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editText: {
    textAlign: 'center',
    color: '#007bff',
    marginTop: 8,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
