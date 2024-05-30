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
import { PieChart } from "react-native-gifted-charts";
import Labelrow2 from "./structs/Labelrow2";
import GradientBackground from "./GradientBackground";

export function TheoryScreen({ navigation }) {
  const [backwardOpacity1, setBackwardOpacity1] = useState(0.5);
  const [backwardOpacity2, setBackwardOpacity2] = useState(1);
  const [noteValue1, setNote1Value] = useState(0);
  const [noteValue2, setNote2Value] = useState(0);
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

  const changeString1 = () => {
    if (noteValue2 == 0) {
      setCurrentIndex(0);
      setBackwardOpacity1(0.5);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1) % strings.length);
      setBackwardOpacity1(1);
    }
    if (noteValue2 >= 0) {
      
      setBackwardOpacity2(1);
    }
    if (noteValue2 == 1) {
      setBackwardOpacity1(0.5);
    }
  };
  const changeString2 = () => {
    if (noteValue2 == 12) {
      setCurrentIndex(12);
      setBackwardOpacity2(0.5);
    } else {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1)
      );
      setBackwardOpacity2(1);
      setBackwardOpacity1(1);
    }
    if (noteValue2 == 11) {
      setBackwardOpacity2(0.5);
    }
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
          <Labelrow2 labeltext={strings[currentIndex]} note={noteValue2} />
          <Labelrow2 labeltext={strings[currentIndex]} note={noteValue2+13}/>
        </View>
      ),
    },
  ];

  useEffect(() => {
    const completionPercentage = Math.floor((100 * noteValue2) / 12);
    setPieData([
      { value: completionPercentage, color: "#177AD5" },
      { value: 100 - completionPercentage, color: "lightgray" },
    ]);
  }, [noteValue2]);

  return (
    <GradientBackground>
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
            if (noteValue2 === 0) {
              setNote2Value(0);
              changeString1();
            } else {
              setNote2Value(noteValue2 - 1);
              changeString1();
            }
          }}
          style={[styles.iconContainer1, { opacity: backwardOpacity1 }]}
        >
          <AntDesign name="banckward" size={35} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (noteValue2 === 12) {
              setNote2Value(12);
              changeString2();
            } else {
              setNote2Value(noteValue2 + 1);
              changeString2();
            }
          }}
          style={[styles.iconContainer2, { opacity: backwardOpacity2 }]}
        >
          <AntDesign name="forward" size={35} color="black" />
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
                {Math.floor((100 * noteValue2) / 12) + "%"}
              </Text>
            );
          }}
        />
      </View>
    </View>
    </GradientBackground>
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
    flexDirection: "row",
    position: "absolute",
    bottom: "4.6%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonContainer2: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    right: 0,
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
  iconContainer1: {
    marginLeft: 0,
  },
  iconContainer2: {
    marginLeft: 15,
  },
});
