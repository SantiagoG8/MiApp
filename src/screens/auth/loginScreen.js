import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from "react-native";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: '', password: '' });

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
            console.log("Login exitoso!");
            navigation.navigate("MainTabs");  
        }
    };

    return (
        <ImageBackground 
            source={require("../../../assets/138.png")}  
            style={styles.background}
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Bienvenidos!</Text>

                <TextInput
                    style={[styles.input, error.email ? styles.inputError : null]}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                />
                {error.email ? <Text style={styles.errorText}>{error.email}</Text> : null}

                <TextInput
                    style={[styles.input, error.password ? styles.inputError : null]}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                {error.password ? <Text style={styles.errorText}>{error.password}</Text> : null}

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.linkText}>¿No tienes una cuenta? Regístrate aquí</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',  
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',  
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        marginBottom: 5,
        borderRadius: 8,
        backgroundColor: '#fff',  
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
        color: '#39dd9a',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
    },
});

export default LoginScreen;
