import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons"; 
import { Audio } from "expo-av";

const soundFiles = {
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
  13: require("../../assets/sounds/Unison.wav"),
  14: require("../../assets/sounds/Minor2ndD.wav"),
  15: require("../../assets/sounds/Major2ndD.wav"),
  16: require("../../assets/sounds/Minor3rdD.wav"),
  17: require("../../assets/sounds/Major3rdD.wav"),
  18: require("../../assets/sounds/Perfect4thD.wav"),
  19: require("../../assets/sounds/TritoneD.wav"),
  20: require("../../assets/sounds/Perfect5thD.wav"),
  21: require("../../assets/sounds/Minor6thD.wav"),
  22: require("../../assets/sounds/Major6thD.wav"),
  23: require("../../assets/sounds/Minor7thD.wav"),
  24: require("../../assets/sounds/Major7thD.wav"),
  25: require("../../assets/sounds/OctaveD.wav"),
  // Add more mappings as needed
};

const Labelrow2 = ({ labeltext, note }) => {
  if (note === 13) {
    return null; 
  }
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  const getNote = (note) => {
    if (soundFiles.hasOwnProperty(note)) {
      return soundFiles[note];
    } else {
      console.warn(`Note sound for "${note}" not found.`);
      return null;
    }
  };

  const playSound = async (note) => {
    const soundFile = getNote(note);

    if (!soundFile) {
      console.error(`No sound file found for note: ${note}`);
      return;
    }

    try {
      const { sound: newSound } = await Audio.Sound.createAsync(soundFile);
      setSound(newSound);
      await newSound.playAsync();

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          newSound.unloadAsync();
          setIsPlaying(false);
          setSound(null);
        }
      });

      setIsPlaying(true);
    } catch (error) {
      console.error(`Error playing sound for note: ${note}`, error);
    }
  };

  const stopSound = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
        setIsPlaying(false);
        setSound(null);
      } catch (error) {
        console.error("Error stopping sound", error);
      }
    }
  };

  const handlePress = () => {
    if (isPlaying) {
      stopSound();
    } else {
      playSound(note);
    }
  };

  return (
    <View style={styles.container2}>
      <Text style={styles.TitleLabel}>{labeltext}</Text>
      <TouchableOpacity onPress={handlePress} style={styles.iconContainer}>
        <AntDesign
          name={isPlaying ? "closecircle" : "play"}
          size={24}
          color={isPlaying ? "black" : "#2196F3"}
          style={styles.buttonPlay}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  TitleLabel: {
    fontSize: 16,
   // fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  iconContainer: {
    marginLeft: 0,
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  buttonPlay: {
    left: 16,
  },
});

export default Labelrow2;
