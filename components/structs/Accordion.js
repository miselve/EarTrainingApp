import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const Accordion = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const toggleAccordion = () => {
    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Change 100 to your desired expanded height
  });

  const animatedStyles = {
    height: heightInterpolate,
    overflow: 'hidden',
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
        <Text>{title}</Text>
        <AntDesign name={expanded ? 'minuscircle' : 'pluscircleo'} size={24} color="black" />
      </TouchableOpacity>
      <Animated.View style={[styles.content, animatedStyles]}>
        <Text>{content}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  content: {
    paddingHorizontal: 20,
  },
});

export default Accordion;