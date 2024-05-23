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
import Notes from "./structs/Notes";
import AntDesign from "@expo/vector-icons/AntDesign";
import Foundation from "@expo/vector-icons/Foundation";

export function TheoryScreen({ navigation }) {
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedAccordion(expandedAccordion === index ? null : index);
  };

  const closeOthers = (index) => {
    const closeOthers = (index) => {
      for (let i = 0; i < 3; i++) {
        if (i !== index) {
          setExpandedAccordion(null);
        }
      }
    
    }
  };
  return (
    <View style={styles.container}>
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
        <Notes note1="c" note2="g" />
        <Labelrow labeltext={"(interval type) decending"} />
        <Notes note1="c" note2="Hc" />
        <View style={styles.accordionContainer}>
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
      <View style={styles.buttonContainer1}>
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
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: "5%",
    paddingHorizontal: "20%",
    width: "100%",
  },
  buttonContainer1: {
    position: "absolute",
    bottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
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
  accordionContainer: {
    marginTop: 20, // Adjust as needed
  },
  iconContainer: {
    marginLeft: 0, // Adjust as needed
  },
});
