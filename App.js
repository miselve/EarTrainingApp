import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { ScoreTab } from './components/ScoreTab';
import { HomeScreen } from './components/HomeScreen';
import { TheoryScreen } from './components/TheoryScreen';


const Drawer = createDrawerNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Score" component={ScoreTab} />
        <Drawer.Screen name="Theory" component={TheoryScreen} />
        {/* Add other screens here */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
