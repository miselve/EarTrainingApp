import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Assuming you're using Expo for icons
import { Audio } from "expo-av";
import { soundFiles } from "../QuizScreen";
// Mapping of note names to their corresponding sound files

const Labelrow2 = ({ labeltext, note}) => {
  {/*const soundFiles = {
    0: require("../../assets/sounds/Unison.wav"),
    1: require("../../assets/sounds/Minor2nd.wav"),
    2: require("../../assets/sounds/Major2nd.wav"),
    3: require("../../assets/sounds/Minor3rd.wav"),
    4: require("../../assets/sounds/Major3rd.wav"),
    5: require("../../assets/sounds/Perfect4th.wav"),
    6: require("../../assets/sounds/Tritone.wav"),
    7: require("../../assets/sounds/Perfect5th.wav"),
    8: require("../../assets/sounds/Minor6th.wav"),
    9: require("../../assets/sounds/Major6th.wav"),
    10: require("../../assets/sounds/Minor7th.wav"),
    11: require("../../assets/sounds/Major7th.wav"),
    12: require("../../assets/sounds/Octave.wav"),
  };    */}
  const playSound = async (note) => {
    // Check if the note exists in the soundFiles object
    const soundFile = soundFiles[note];
    
    if (!soundFile) {
      console.error(`No sound file found for note: ${note}`);
      return;
    }
  
    try {
      // Create and play the sound
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();
  
      // Handle sound completion
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          // Unload the sound once it finishes playing
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error(`Error playing sound for note: ${note}`, error);
    }
  };
  
  
  return (
    <View style={styles.container2}>
      <Text style={styles.TitleLabel}>{labeltext}</Text>
      <TouchableOpacity
        onPress={() => playSound(soundFiles[note])}
        style={styles.iconContainer}
      >
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

export default Labelrow2;
