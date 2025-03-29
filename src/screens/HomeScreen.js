import React from 'react';
import { Text, StyleSheet, ImageBackground } from 'react-native'; 
import colors from '../Constants/colors';

const HomeScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/140.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.text}>CURSO DE BARBERÍA</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%', 
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 0,
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f31806',
    marginBottom: 20,
  },
});

export default HomeScreen;
