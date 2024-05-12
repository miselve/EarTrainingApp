import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import Accordion from "./structs/Accordion";
import Labelrow from "./structs/Labelrow";
import AntDesign from "@expo/vector-icons/AntDesign";
import Foundation from '@expo/vector-icons/Foundation';
export function TheoryScreen({ navigation }) {
  return (
    <View>
      <View style={styles.buttonContainer}>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
      <Labelrow labeltext={"(interval type) ascending"} />
      <View>
        <Image
          source={require("../assets/notes.png")}
          style={{ width: 550, height: 50 }}
        />
        <Labelrow labeltext={"(interval type) decending"} />
        <Image
          source={require("../assets/notes.png")}
          style={{ width: 550, height: 50 }}
        />
        <View style={styles.container}>
          <Accordion title="Theory Section 1" content="Content of section 1" />
          <Accordion title="Theory Section 2" content="Content of section 2" />
          <Accordion
            title="Related Tracks    "
            content={<View>
              <Labelrow labeltext={"track 1   "}/>
              <Labelrow labeltext={"track 2   "}/>
              </View>
            }
          />
        </View>
      </View>
      <View style={styles.container3}>
      <TouchableOpacity
        onPress={() => console.log("Play button clicked")}
        style={styles.iconContainer}
      >
        <Foundation name="next" size={60} color="black" />
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: "5%",
    paddingHorizontal: "20%",
    width: "100%",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  TitleLabel: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center", // Center the text
    flex: 1,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginLeft: 0, // Adjust as needed
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16, // Adjust as needed
  },
  container3: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingHorizontal: 16, // Adjust as needed
  },
});
