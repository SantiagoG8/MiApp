import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../services/firebaseConfig"; 
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "usuarios", user.uid), {
                name: name,
                email: email,
                createdAt: new Date(),
            });

          
            Alert.alert(
                "Registro exitoso",  
                "Tu cuenta ha sido creada correctamente.",
                [{ text: "OK", onPress: () => navigation.navigate("Login") }]  
            );

        } catch (error) {
            console.error("Error al registrar usuario:", error.message);
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError("El correo ya está registrado.");
                    break;
                case 'auth/invalid-email':
                    setError("Correo electrónico no válido.");
                    break;
                case 'auth/weak-password':
                    setError("La contraseña debe tener al menos 6 caracteres.");
                    break;
                default:
                    setError("Error al registrar. Por favor, verifica los datos.");
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crea tu nueva cuenta</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TextInput
                style={styles.input}
                placeholder="Confirmar Contraseña"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.linkText}>¿Ya tienes una cuenta? Inicia sesión aquí</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        marginBottom: 15,
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#0077B6',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
    linkText: {
        color: '#0077B6',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
    },
});

export default RegisterScreen;
