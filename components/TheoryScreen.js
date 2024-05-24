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
  
  const [noteValue1, setNote1Value] = useState(1);
  const [noteValue2, setNote2Value] = useState(1);
  const [strings, setStrings] = useState(['Perfect unison', 'Minor second', 'Major second','Minor third', 'Major third', 'Perfect fourth','Tritone', 'Perfect fifth', 'Minor sixth','Major sixth', 'Minor seventh', 'Major seventh','Perfect octave']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const changeString = () => {
    // Update the index to the next one, wrapping around if needed
    setCurrentIndex((prevIndex) => (prevIndex + 1) % strings.length);
  };
  const accordionData = [
    { title: (strings[currentIndex] +" ascending Theory"), content: "Content for accordion 1" },
    { title: (strings[currentIndex] +" descending Theory"), content: "Content for accordion 2" },
    {
      title: "Related Tracks",
      content: (
        <View>
          <Labelrow labeltext={"track 1   "} />
          <Labelrow labeltext={"track 2   "} />
        </View>
      ),
    },
  ];
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
      <Labelrow labeltext={strings[currentIndex] +" ascending"} />
      <View>
        <Notes note1={noteValue1} note2={noteValue2} />
        <Labelrow labeltext={strings[currentIndex] +" decending"} />
        <Notes note1={noteValue2} note2={noteValue1} />
        <View style={styles.accordionContainer}>
          <Accordion data={accordionData} />
        </View>
      </View>
      <View style={styles.buttonContainer1}>
        <TouchableOpacity
          onPress={() => {
            if (noteValue2 == 13) {
              setNote2Value(1);
              changeString();
            } else {
              setNote2Value(noteValue2 + 1);
              changeString();
            }
          }}
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
