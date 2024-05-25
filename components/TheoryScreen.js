import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import Accordion from "./structs/Accordion";
import Labelrow from "./structs/Labelrow";
import Notes from "./structs/Notes";
import AntDesign from "@expo/vector-icons/AntDesign";
import Foundation from "@expo/vector-icons/Foundation";
import { PieChart } from "react-native-gifted-charts";

export function TheoryScreen({ navigation }) {
  const [noteValue1, setNote1Value] = useState(1);
  const [noteValue2, setNote2Value] = useState(1);
  const [strings, setStrings] = useState([
    "Perfect unison",
    "Minor second",
    "Major second",
    "Minor third",
    "Major third",
    "Perfect fourth",
    "Tritone",
    "Perfect fifth",
    "Minor sixth",
    "Major sixth",
    "Minor seventh",
    "Major seventh",
    "Perfect octave",
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [theory, setTheory] = useState([
    "test0",
    "test1",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
    "test7",
    "test8",
    "test9",
    "test10",
    "test11",
    "test12",
  ]);
  const [pieData, setPieData] = useState([
    { value: 100, color: "#177AD5" },
    { value: 100, color: "lightgray" },
  ]);

  const changeString = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % strings.length);
  };

  const accordionData = [
    {
      title: strings[currentIndex] + " ascending Theory",
      content: theory[currentIndex],
    },
    {
      title: strings[currentIndex] + " descending Theory",
      content: theory[currentIndex],
    },
    {
      title: "Related Tracks",
      content: (
        <View>
          <Labelrow labeltext={"track 1   "} />
          <Labelrow labeltext={"track 2   "} />
        </View>
      ),
    },
  ];

  useEffect(() => {
    const completionPercentage = Math.floor((100 * (noteValue2 - 1)) / 12);
    setPieData([
      { value: completionPercentage, color: "#177AD5" },
      { value: 100 - completionPercentage, color: "lightgray" },
    ]);
  }, [noteValue2]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {/*<TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>*/}
      </View>
      <Labelrow
        labeltext={strings[currentIndex] + " ascending"}
        firstNote={0}
        secondNote={noteValue2 - 1}
      />
      <View>
        <Notes note1={noteValue1} note2={noteValue2} />
        <Labelrow
          labeltext={strings[currentIndex] + " descending"}
          firstNote={noteValue2 - 1}
          secondNote={0}
        />
        <Notes note1={noteValue2} note2={noteValue1} />
        <View style={styles.accordionContainer}>
          <Accordion data={accordionData} />
        </View>
      </View>
      <View style={styles.buttonContainer1}>
        <TouchableOpacity
          onPress={() => {
            if (noteValue2 === 13) {
              setNote2Value(1);
              changeString();
            } else {
              setNote2Value(noteValue2 + 1);
              changeString();
            }
          }}
          style={styles.iconContainer}
        >
          <Foundation name="next" size={60} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer2}>
        <Text style={styles.theoryCompletionText}> Theory Completion: </Text>
        <PieChart
          donut
          innerRadius={38}
          radius={50}
          data={pieData}
          centerLabelComponent={() => {
            return (
              <Text style={{ fontSize: 30 }}>
                {Math.floor((100 * (noteValue2 - 1)) / 12) + "%"}
              </Text>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: "5%",
    paddingHorizontal: "20%",
    width: "100%",
  },
  buttonContainer1: {
    position: "absolute",
    bottom: "3%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonContainer2: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    right: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  theoryCompletionText: {
    marginRight: 10,
    fontSize: 16,
    marginTop: "15%",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  TitleLabel: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  accordionContainer: {
    marginTop: 20,
  },
  iconContainer: {
    marginLeft: "10%",
  },
});
