import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const Accord = ({ title, content, index, currentIndex, setCurrentIndex, scrollToEnd }) => {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const expanded = index === currentIndex;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      if (expanded) {
        scrollToEnd(); // Scroll to end when expanded
      }
    });
  }, [expanded, animation]);

  const toggleAccordion = () => {
    setCurrentIndex(expanded ? null : index);
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 105], // Adjust 100 to fit your content height
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
          size={30}
          color="black"
        />
      </TouchableOpacity>
      <Animated.View style={[styles.content, animatedStyles]}>
        <View>{content}</View>
      </Animated.View>
    </View>
  );
};

const Accordion = ({ data, scrollToEnd }) => {
  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <View>
      {data.map((item, index) => (
        <Accord
          key={index}
          title={<Text>{item.title}</Text>}
          content={<Text>{item.content}</Text>}
          index={index}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          scrollToEnd={scrollToEnd} // Pass scrollToEnd function
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
