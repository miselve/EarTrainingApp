import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView
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
  const [quizLevel, setQuizLevel] = useState(1)
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
    "A unison interval occurs when two notes are played simultaneously, and they are identical in pitch. It creates a sense of unity and stability, often heard in unison melodies or in the opening of chords.",
    "A minor second interval consists of two adjacent notes, where the second note is one semitone higher than the first. It produces a dissonant and tense sound, commonly used for creating suspense or adding chromatic color to melodies and harmonies.",
    "A major second interval comprises two consecutive notes with a distance of a whole tone between them. It imparts a bright and uplifting quality, frequently found in melodies, scales, and harmonies to create motion and direction.",
    "A minor third interval spans three semitones between two notes. It embodies a melancholic and introspective mood, often employed in minor keys for expressing emotional depth and longing in melodies and harmonies.",
    "A major third interval encompasses four semitones, creating a sense of brightness and optimism. It's prevalent in major chords and scales, contributing to their uplifting and consonant character.",
    "A perfect fourth interval spans five semitones and carries a stable and consonant quality. It's fundamental in harmony, forming the basis of many chords and providing a sense of grounding and resolution.",
    "The tritone is an interval of six semitones, known for its dissonant and unresolved sound. It's often referred to as the 'devil's interval' due to its unsettling quality, frequently used in music to create tension and anticipation.",
    "A perfect fifth interval spans seven semitones and is renowned for its strong and stable sound. It's prevalent in both melody and harmony, forming the backbone of power chords and providing a sense of strength and completeness.",
    "The minor sixth interval comprises eight semitones, evoking a somber and introspective mood. It's frequently utilized in minor keys to add color and depth to melodies and harmonies.",
    "A major sixth interval spans nine semitones and exudes a warm and mellow quality. It's often used to create a sense of openness and expansion in melodies and chords.",
    "The minor seventh interval encompasses ten semitones, imparting a bluesy and soulful vibe. It's commonly found in dominant seventh chords and jazz progressions, adding richness and tension to harmonic sequences.",
    "A major seventh interval spans eleven semitones and radiates a dreamy and ethereal atmosphere. It's frequently employed in jazz and impressionistic music to convey a sense of longing and nostalgia.",
    "An octave interval encompasses twelve semitones, representing a doubling or halving of frequency between two notes. It creates a sense of completeness and symmetry, often used to establish tonal centers and define musical scales.",
    "The descending unison is no different than the ascending unison, as it involves two notes played simultaneously with identical pitches.",
    "The descending minor second interval, with the second note one semitone lower than the first, retains its dissonant and tense quality. It's commonly used to create downward motion in melodies and to introduce a sense of anticipation or instability in harmonic progressions.",
    "Descending major second intervals, spanning a whole tone between notes, still carry a bright and uplifting character. They're frequently employed in melodic descents and chord inversions to maintain continuity and balance within musical phrases.",
    "The descending minor third interval, with three semitones between notes, maintains its melancholic and introspective mood. It often appears in descending melodic lines or in minor chord progressions, adding emotional depth and poignancy to musical compositions.",
    "Descending major thirds, encompassing four semitones, retain their bright and optimistic quality. They're commonly used in melodic descents and chord inversions to introduce tension and release within harmonic structures.",
    "Descending perfect fourth intervals, spanning five semitones, continue to provide a stable and consonant foundation. They're frequently used in bass lines and harmonic progressions to create resolution and closure.",
    "Descending tritone intervals, with six semitones between notes, maintain their dissonant and unresolved sound. They're often utilized in descending chromatic passages or in harmonic sequences to introduce tension and ambiguity.",
    "Descending perfect fifths, with seven semitones between notes, retain their strong and stable character. They're commonly used in bass lines and melodic descents to establish tonal centers and provide a sense of grounding within musical compositions.",
    "Descending minor sixth intervals, spanning eight semitones, still evoke a somber and introspective mood. They're frequently employed in descending melodic lines or in minor chord progressions to add emotional depth and richness to musical phrases.",
    "Descending major sixth intervals, with nine semitones between notes, maintain their warm and mellow quality. They're often used in descending melodic lines or in harmonic progressions to create a sense of openness and expansiveness within musical compositions.",
    "Descending minor seventh intervals, encompassing ten semitones, retain their bluesy and soulful vibe. They're commonly found in descending dominant seventh chords and jazz progressions, adding richness and tension to melodic and harmonic sequences.",
    "Descending major seventh intervals, spanning eleven semitones, still convey a dreamy and ethereal atmosphere. They're frequently utilized in descending melodic lines or in jazz and impressionistic music to evoke a sense of longing and nostalgia.",
    "Descending octave intervals, with twelve semitones between notes, maintain their sense of completeness and symmetry. They're often used in bass lines and harmonic progressions to establish tonal centers and define the lower register of musical compositions.",
  ]);
  const [songs, setSongs] = useState([
    "Unison: Ode to Joy",
    "Ascending Minor 2nd: Pink Panther Theme Song",
    "Ascending Major 2nd: Silent Night",
    "Ascending Minor 3rd: Green Sleeves",
    "Ascending Major 3rd: Oh when the Saints",
    "Ascending perfect 4th: Harry Potter Theme Song",
    "Ascending Tritone: West side story - Maria",
    "Ascending perfect 5th: Twinkle Twinkle Little Star",
    "Ascending minor 6th: The Last of the Mohicans",
    "Ascending major 6th: Jingle Bells",
    "Ascending minor 7th: Star Trek Series Theme Song",
    "Ascending major 7th: Superman Theme Song",
    "Ascending Octave: Somewhere over the Rainbow",
    " ",
    "Descending Minor 2nd: Fur Elise",
    "Descending Major 2nd: Mary Had a Little Lamb",
    "Descending Minor 3rd: Frosty the Snowman",
    "Descending Major 3rd: Swing Low Sweet Chariot",
    "Descending perfect 4th: Eine Kleine Nachtmusik",
    "Descending Tritone: La Danse Macambre",
    "Descending perfect 5th: Game of Thrones Theme Song",
    "Descending minor 6th: Love Story Theme Song",
    "Descending major 6th: Phantom of The Opera",
    "Descending minor 7th: None but the Lonely Heart",
    "Descending major 7th: I Love You - Cole Porter",
    "Descending Octave: Doogie Howser M.D. Theme Song",
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
  const [showModal, setShowModal] = useState(false); // State for showing modal
  const changeString2 = () => {
    if (noteValue2 === 12) {
      setCurrentIndex(12);
      setBackwardOpacity2(0.5);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setBackwardOpacity2(1);
      setBackwardOpacity1(1);
    }
    if (noteValue2 === 12) {
      setBackwardOpacity2(0.5);
    }
    if (noteValue2 === 4) {
      // Condition to show modal
      setQuizLevel(1);
      setShowModal(true);

    }
    else if (noteValue2 === 9) {
      setQuizLevel(2);
      setShowModal(true);
    }
    else if (noteValue2 === 12) {
      setQuizLevel(3);
      setShowModal(true);
    }
    else {
      setShowModal(false);
    }
  };

  const accordionData = [
    {
      title: (
        <Text style={{ fontWeight: "bold" }}>
          {strings[currentIndex] + " ascending Theory"}
        </Text>
      ),
      content: theory[currentIndex],
    },
    {
      title: (
        <Text style={{ fontWeight: "bold" }}>
          {strings[currentIndex] + " descending Theory"}
        </Text>
      ),
      content: theory[currentIndex + 13],
    },
    {
      title: <Text style={{ fontWeight: "bold"}}>Related Tracks</Text>,
      content: (
        <View>
          <Labelrow2 labeltext={songs[currentIndex]} note={noteValue2} />
          <Labelrow2
            labeltext={songs[currentIndex + 13]}
            note={noteValue2 + 13}
          />
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

  function HandleNavigation() {
    navigation.navigate("Quiz")
    setShowModal(false)
  }

  return (
    <GradientBackground>
      <View style={styles.container}>
        <ScrollView style={{ maxHeight: '100%' }}>

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
        </ScrollView>
        <View style={{ maxHeight: '50%', justifyContent: 'space-between' }}>
          <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', paddingBottom: 15}}>
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
            <Modal
              animationType="slide"
              transparent={true}
              visible={showModal}
              onRequestClose={() => setShowModal(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={{ paddingBottom: 50, textAlign: "center" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 24 }}>Knowledge Check:</Text>
                    {"\n\n"}
                    At this point, you should be able to complete Quiz Level {quizLevel}.{"\n\n"}
                  </Text>
                  <View style={styles.buttonContainer3}>

                    <TouchableOpacity style={styles.button_close} onPress={() => setShowModal(false)}>
                      <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonContainer4}>
                    <TouchableOpacity style={styles.button} onPress={() => HandleNavigation()}>
                      <Text style={styles.buttonText}>Take Quiz</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    //position: "absolute",
    //bottom: "4.6%",
    //paddingVertical: 10,
    //paddingHorizontal: 20,
    //borderRadius: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  button_close: {
    backgroundColor: '#d9534f',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer2: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    //position: "absolute",
    //bottom: 10,
    //right: 0,
    //paddingVertical: 10,
    //paddingHorizontal: 20,
    //borderRadius: 5,
  },
  theoryCompletionText: {
    //marginRight: 10,
    fontSize: 16,
    //marginTop: "15%",
    fontWeight: "bold",
    alignItems: 'center',
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
    marginTop: 45,
  },
  iconContainer1: {
    marginLeft: 0,
  },
  iconContainer2: {
    marginLeft: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonContainer3: {
    //flexDirection: "row",
    position: "absolute",
    bottom: 0,
    paddingVertical: 5,
    right: 20,
    //paddingHorizontal: 20,
    //borderRadius: 5,
  },
  buttonContainer4: {
    position: "absolute",
    bottom: 0,
    paddingVertical: 5,
    left: 20,
  },
});
