import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

// Function to dynamically require images based on note name
const getNoteImage = (note) => {
  switch (note) {
    case 1:
      return require("../../assets/c.png");
    case 2:
      return require("../../assets/dF.png");
    case 3:
      return require("../../assets/d.png");
    case 4:
      return require("../../assets/eF.png");
    case 5:
      return require("../../assets/e.png");
    case 6:
      return require("../../assets/f.png");
    case 7:
      return require("../../assets/gF.png");
    case 8:
      return require("../../assets/g.png");
    case 9:
      return require("../../assets/aF.png");
    case 10:
      return require("../../assets/a.png");
    case 11:
      return require("../../assets/bF.png");
    case 12:
      return require("../../assets/b.png");
    case 13:
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
