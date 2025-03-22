import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../Constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  return (
    <LinearGradient colors={colors.gradienteSecundario} style={styles.container}>
      <Text style={styles.text}>CURSO DE BARBERIA</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HomeScreen;
