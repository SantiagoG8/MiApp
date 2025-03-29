import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const Modulos = () => {
  return (
    <ImageBackground 
      source={require('../../assets/139.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Cortes & Estilos</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  titleContainer: {
    marginTop: -15, 
    alignSelf: 'flex-start',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0618f3',
    textAlign: 'center',
  },
});

export default Modulos;

