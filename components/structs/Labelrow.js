import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Assuming you're using Expo for icons
import { Audio } from "expo-av";
import { soundFiles } from "../QuizScreen";
// Mapping of note names to their corresponding sound files
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

const Labelrow = ({ labeltext, firstNote, secondNote }) => {
  return (
    <View style={styles.container2}>
      <Text style={styles.TitleLabel}>{labeltext}</Text>
      <TouchableOpacity onPress={() => playSound(firstNote, secondNote)} style={styles.iconContainer}>
        <AntDesign name="play" size={24} color="#2196F3" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  TitleLabel: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center", // Center the text
    flex: 1,
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
});

export default Labelrow;
