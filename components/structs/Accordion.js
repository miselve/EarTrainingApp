import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const Accord = ({ title, content, index, currentIndex, setCurrentIndex }) => {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const expanded = index === currentIndex;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded, animation]);

  const toggleAccordion = () => {
    setCurrentIndex(expanded ? null : index);
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Change 100 to your desired expanded height
  });

  const animatedStyles = {
    height: heightInterpolate,
    overflow: "hidden",
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
        <Text>{title}</Text>
        <AntDesign
          name={expanded ? "minuscircle" : "pluscircleo"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <Animated.View style={[styles.content, animatedStyles]}>
        <Text>{content}</Text>
      </Animated.View>
    </View>
  );
};

const Accordion = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <View>
      {data.map((item, index) => (
        <Accord
          key={index}
          title={item.title}
          content={item.content}
          index={index}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  content: {
    paddingHorizontal: 20,
  },
});

export default Accordion;
