import React from "react";
import { Text, View, Image, StyleSheet, Button } from "react-native";
import { soundFiles } from "../QuizScreen";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";

// Function to dynamically require images based on note name
const getNoteImage = (note) => {
  switch (note) {
    case 0:
      return require("../../assets/c.png");
    case 1:
      return require("../../assets/dF.png");
    case 2:
      return require("../../assets/d.png");
    case 3:
      return require("../../assets/eF.png");
    case 4:
      return require("../../assets/e.png");
    case 5:
      return require("../../assets/f.png");
    case 6:
      return require("../../assets/gF.png");
    case 7:
      return require("../../assets/g.png");
    case 8:
      return require("../../assets/aF.png");
    case 9:
      return require("../../assets/a.png");
    case 10:
      return require("../../assets/bF.png");
    case 11:
      return require("../../assets/b.png");
    case 12:
      return require("../../assets/Hc.png");
    // Add cases for other notes as needed
    default:
      console.warn(`Note image for "${note}" not found.`);
      return null;
  }
};
const playSound = async (firstNote, secondNote) => {
  // Play the first sound
  const { sound: sound1 } = await Audio.Sound.createAsync(soundFiles[firstNote]);
  await sound1.playAsync();

  // Stop the first sound after 0.5 seconds and then play the second sound
  setTimeout(async () => {
    await sound1.stopAsync();
    await sound1.unloadAsync();

    // Delay for 0.5 seconds before playing the second sound
    setTimeout(async () => {
      const { sound: sound2 } = await Audio.Sound.createAsync(soundFiles[secondNote]);
      await sound2.playAsync();

      // Stop the second sound after 0.5 seconds
      setTimeout(async () => {
        await sound2.stopAsync();
        await sound2.unloadAsync();
      }, 500);
    }, 500);
  }, 500);
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
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => playSound(note1, note2)}
          title={<AntDesign name="play" size={35} color="#2196F3" />}
          color="transparent"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonContainer: {
    position: "absolute",
    right: 40,
  }

});

export default Notes;
