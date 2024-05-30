import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


const Labelrow = ({ labeltext, firstNote, secondNote }) => {
  return (
    <View style={styles.container2}>
      <Text style={styles.TitleLabel}>{labeltext}</Text>
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
    marginBottom: 10,
    marginTop: 10,
  },
});

export default Labelrow;
