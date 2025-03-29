import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from "../services/firebaseConfig";
import { sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { LinearGradient } from 'expo-linear-gradient';

const UserScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Usuario autenticado:", user ? user.email : "No hay usuario autenticado");
      setCurrentUser(user);  
    });
    return unsubscribe;  
  }, []);

  const handleChangePassword = async () => {
    if (currentUser?.email) {
      try {
        await sendPasswordResetEmail(auth, currentUser.email);
        Alert.alert(
          "Cambio de contraseña",
          `Se ha enviado un enlace de restablecimiento de contraseña a: ${currentUser.email}`
        );
      } catch (error) {
        console.error("Error al enviar el correo de cambio de contraseña:", error);
        Alert.alert("Error", "No se pudo enviar el correo de restablecimiento. Inténtalo de nuevo.");
      }
    } else {
      Alert.alert("Error", "No se encontró un usuario autenticado.");
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("Sesión cerrada exitosamente");
      navigation.replace("Login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Alert.alert("Error", "No se pudo cerrar la sesión. Inténtalo de nuevo.");
    }
  };

  const handleViewInfo = () => {
    if (currentUser) {
      Alert.alert(
        "Información del Usuario",
        `Correo: ${currentUser.email}\nUID: ${currentUser.uid}`
      );
    } else {
      console.warn("No hay usuario autenticado");
      Alert.alert("Error", "No hay información de usuario disponible.");
    }
  };

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <Text style={styles.title}>Mi Cuenta</Text>
      <Text style={styles.text}>Aquí puedes gestionar tu cuenta</Text>

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Cambiar Clave</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.infoButton]} onPress={handleViewInfo}>
        <Text style={styles.buttonText}>Ver Información</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#0077B6',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    elevation: 3,
  },
  logoutButton: {
    backgroundColor: '#FF5C5C',
  },
  infoButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserScreen;
