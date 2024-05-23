import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

// Function to dynamically require images based on note name
const getNoteImage = (note) => {
  switch (note) {
    case "c":
      return require("../../assets/c.png");
    case "d":
      return require("../../assets/d.png");
    case "e":
      return require("../../assets/e.png");
    case "f":
      return require("../../assets/f.png");
    case "g":
      return require("../../assets/g.png");
    case "a":
      return require("../../assets/a.png");
    case "b":
      return require("../../assets/b.png");
    case "Hc":
      return require("../../assets/Hc.png");
    // Add cases for other notes as needed
    default:
      console.warn(`Note image for "${note}" not found.`);
      return null;
  }
};

const Notes = ({ note1, note2 }) => {
  return (
    <View style={styles.ImageContainer}>
      <Image
        source={require("../../assets/Gkey.png")}
        style={{ width: 48, height: 130 }}
      />
      <Image source={getNoteImage(note1)} style={{ width: 48, height: 130 }} />
      <Image source={getNoteImage(note2)} style={{ width: 48, height: 130 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default Notes;
