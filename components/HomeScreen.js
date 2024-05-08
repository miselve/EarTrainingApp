import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Score')}>
        <Text style={styles.buttonText}>Go to Score</Text>
      </TouchableOpacity>
      {/* Add more components as needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
