import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Assuming you're using Expo for icons

const Labelrow = ({ labeltext }) => {
  return (
    <View style={styles.container2}>
      <Text style={styles.TitleLabel}>{labeltext}</Text>
      <TouchableOpacity
        onPress={() => console.log("Play button clicked")}
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

export default Labelrow;
