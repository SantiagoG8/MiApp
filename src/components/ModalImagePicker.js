import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";
import colors from "../Constants/colors";

const ModalImagePicker = ({ visible, ImageUri, onChooseImage, onSave }) => {
  const navigation = useNavigation();

  const handleCancel = () => {
    navigation.goBack(); 
  };

  const handleSave = async () => {
    if (onSave && typeof onSave === 'function') {
      await onSave(); 
    }

    showMessage({
      message: "¡Imagen guardada correctamente!",
      type: "success",
      duration: 3000,
      icon: "success",
    });

    navigation.goBack(); 
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={handleCancel}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Cambiar foto de perfil</Text>
          <Image source={{ uri: ImageUri }} style={styles.imagePreview} />

          <TouchableOpacity style={styles.imageButton} onPress={onChooseImage}>
            <Text style={styles.imageButtonText}>Seleccionar Imagen</Text>
          </TouchableOpacity>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleSave}>
              <Text style={styles.modalButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imagePreview: {
    width: 20,
    height: 20,
    borderRadius: 75,
    marginBottom: 15,
  },
  imageButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  imageButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.secondary,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: colors.success,
  },
  modalButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ModalImagePicker;
