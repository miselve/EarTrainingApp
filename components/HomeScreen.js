import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import GradientBackground from './GradientBackground';


export function HomeScreen({ navigation }) {
  return (
    <GradientBackground>
      <View style={styles.overlay}>
        <Image source={require('../assets/favicon.png')} style={styles.topImage} />
        <Text style={styles.title}>Ear Training App</Text>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Theory')}>
          <Text style={styles.buttonText}>Go to Theory</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz')}>
          <Text style={styles.buttonText}>Go to Quiz</Text>
        </TouchableOpacity>
      </View>
      </GradientBackground>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(255, 255, 255, 0.6)', // Optional: Adds a white overlay with opacity to improve text visibility
    width: '100%', // Ensures the overlay covers the entire screen
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black', // Ensure text is visible over the gradient
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  topImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  }
});
