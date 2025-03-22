import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native"; 
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../Constants/colors";

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 6000);
        
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <LinearGradient colors={colors.gradientePrimario} style={styles.container}> {/* Corrección en la sintaxis */}
            <Text style={styles.text}>💈BIENVENIDOS A MI APP CURSO DE BARBERIA💈</Text>
            <Image source={require('../../assets/descarga.png')} style={styles.logo} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 300,  
        height: 300, 
    },
    text: {
        color: colors. default,
        frontSize: 20,
        frontWeight: 'bold',
        marginBottom: 20,

    }
});

export default SplashScreen;