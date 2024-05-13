// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen ,ScoreTab, TheoryScreen, AboutScreen, QuizScreen } from './components/pages';
//import { AboutScreen } from './components/AboutScreen';
import CustomDrawerContent from './components/structs/CustomDrawerContent'; // Corrected import statement
import { Divider } from 'react-native-paper';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Theory" component={TheoryScreen} />
        <Drawer.Screen name="Quiz" component={QuizScreen} />
        <Drawer.Screen name="Score" component={ScoreTab} />
        <Drawer.Screen name="About Us" component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
