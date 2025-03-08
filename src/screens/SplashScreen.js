import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native"; 
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('MainTabs');
        }, 6000);
        
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}> {/* Corrección en la sintaxis */}
            <Text>💈BIENVENIDOS A MI APP CURSO DE BARBERIA💈</Text>
            <Image source={require('../../assets/descarga.png')} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 300,  
        height: 300, 
    },
});

export default SplashScreen;