import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import { Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons
import GradientBackground from './GradientBackground';

export function AboutScreen({ navigation }) {
  function openLinkedIn(url) {
    Linking.openURL(url);
  };

  function openEmail(email) {
    Linking.openURL('mailto:' + email);
  };

  return (
    <GradientBackground>
    <View style={styles.container}>
      <Image source={require('../assets/favicon.png')} style={styles.topImage} />
      <Text style={styles.title}>About this App</Text>
      <Text style={styles.body}>
        This app was crafted using React Native by Michail Selvesakis & Gerasimos Harizanis as a project for 'Educational Innovation and Application Development,' a component of Democritus University of Thrace's curriculum.
      </Text>
      <Text style={styles.title}>About us</Text>
      <View style={styles.nameContainer}>
        <View style={styles.iconsContainer}>
          <Text style={styles.title2}>Michail Selvesakis</Text>
          <TouchableOpacity onPress={() => openLinkedIn('https://www.linkedin.com/in/michael-selvesakis-010b65242/')}>
            <Ionicons name="logo-linkedin" size={22} margin={10} marginRight={10} color="#0077b5" />
          </TouchableOpacity>
          <Text>  </Text>
          <TouchableOpacity onPress={() => openEmail('miselve@cs.ihu.gr')}>
            <Ionicons name="mail-outline" size={22} marginRight={10} color="#FF0000" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.nameContainer}>
        <View style={styles.iconsContainer}>
          <Text style={styles.title2}>Gerasimos Harizanis</Text>
          <TouchableOpacity onPress={() => openLinkedIn('https://www.linkedin.com/in/gerasimos-harizanis-b7699b308/')}>
            <Ionicons name="logo-linkedin" size={22} margin={10} marginRight={10} color="#0077b5" />
          </TouchableOpacity>
          <Text>  </Text>
          <TouchableOpacity onPress={() => openEmail('gecsari@cs.ihu.gr')}>
            <Ionicons name="mail-outline" size={22} marginRight={10} color="#FF0000" />
          </TouchableOpacity>
        </View>
      </View>
      <Divider style={{ marginVertical: 20, width: '90%' }} />
      <Text style={styles.footer}>© 2024 - Ear Training App</Text>
    </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  title2: {
    fontSize: 20,
    marginBottom: 10,
    marginHorizontal: 10
  },
  footer: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'gray',
    margin: -10
  },
  body: {
    marginHorizontal: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 5,
    marginTop: -2, // Adjust this value as needed
  },
});
