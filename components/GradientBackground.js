// GradientBackground.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Importing LinearGradient
import { gradientColors } from '../App';

export const GradientBackground = ({ children }) => {
  return (
    <LinearGradient
      colors={gradientColors} // Define your gradient colors
      start={{ x: 0, y: 0 }} // Starting point of the gradient
      end={{ x: 1, y: 1 }} // Ending point of the gradient
      style={styles.gradient}
    >
      <View style={styles.overlay}>
        {children}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  overlay: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Optional: Adds a white overlay with opacity to improve text visibility
    width: '100%', // Ensures the overlay covers the entire screen
  },
});

export default GradientBackground;
