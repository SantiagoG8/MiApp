import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe'; 
const Videos = () => {
  const playerRef = useRef(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎥 En esta sección podremos ver videos tutoriales 🎥</Text>

      <YoutubeIframe
        ref={playerRef}
        height={300} 
        width={'100%'}
        videoId="PRZNIQ4KU2I" 
        play={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Videos;

