// CustomDrawerContent.js
import { Text, View, StyleSheet, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const Seperator = () => <View style={styles.separator} />; 

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Custom header section */}
      <View style={styles.headerContainer}>
      <Image source={require('../../assets/favicon.png')} style={styles.icon} />

        <Text style={styles.title}>Ear Training App</Text>
      </View>
      
      <Divider/>
      {/* Standard drawer items */}
      <DrawerItemList {...props} />
      <Divider/>
      <Text style={styles.footer}>© 2024 - Ear Training App</Text>
      
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'gray',
    margin: 10
  }
  ,
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
