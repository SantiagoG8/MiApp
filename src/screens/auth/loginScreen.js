import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: '', password: '' });

    // Función para validar email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = () => {
        let isValid = true;
        let errors = { email: '', password: '' };

        if (!validateEmail(email)) {
            errors.email = "Por favor, introduce un email válido.";
            isValid = false;
        }

        if (password.trim().length < 6) {
            errors.password = "La contraseña debe tener al menos 6 caracteres.";
            isValid = false;
        }

        setError(errors);

        if (isValid) {
            console.log("Login successful!");
            navigation.navigate("MainTabs");  // Cambia a la pantalla principal si los datos son válidos
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenidos!</Text>

            <TextInput
                style={[styles.input, error.email ? styles.inputError : null]}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            {error.email ? <Text style={styles.errorText}>{error.email}</Text> : null}

            <TextInput
                style={[styles.input, error.password ? styles.inputError : null]}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {error.password ? <Text style={styles.errorText}>{error.password}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            {/* Línea de redirección a Registro */}
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.linkText}>¿No tienes una cuenta? Regístrate aquí</Text>
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
        marginBottom: 5,
        borderRadius: 8,
    },
    inputError: {
        borderColor: 'red',
    },
    button: {
        backgroundColor: '#0077B6',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
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

export default LoginScreen;
