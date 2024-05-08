import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

export function ScoreTab({ navigation }) {
  const pieData = [
    { value: 20, color: '#177AD5' },
    { value: 80, color: 'lightgray' }
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30, padding: '2%' }}>Score</Text>
      <PieChart
        donut
        innerRadius={100}
        data={pieData}
        centerLabelComponent={() => {
          return <Text style={{ fontSize: 30 }}>20%</Text>;
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '5%',
    paddingHorizontal: '20%',
    width: '100%'
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});
