import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Audio } from 'expo-av';
import GradientBackground from './GradientBackground';

// Sound files for each note
export const soundFiles = {
  0: require('../assets/sounds/0.wav'),
  1: require('../assets/sounds/1.wav'),
  2: require('../assets/sounds/2.wav'),
  3: require('../assets/sounds/3.wav'),
  4: require('../assets/sounds/4.wav'),
  5: require('../assets/sounds/5.wav'),
  6: require('../assets/sounds/6.wav'),
  7: require('../assets/sounds/7.wav'),
  8: require('../assets/sounds/8.wav'),
  9: require('../assets/sounds/9.wav'),
  10: require('../assets/sounds/10.wav'),
  11: require('../assets/sounds/11.wav'),
  12: require('../assets/sounds/12.wav'),
  13: require('../assets/sounds/13.wav'),
  14: require('../assets/sounds/14.wav'),
  15: require('../assets/sounds/15.wav'),
  16: require('../assets/sounds/16.wav'),
  17: require('../assets/sounds/17.wav'),
  18: require('../assets/sounds/18.wav'),
  19: require('../assets/sounds/19.wav'),
  20: require('../assets/sounds/20.wav'),
  21: require('../assets/sounds/21.wav'),
  22: require('../assets/sounds/22.wav'),
  23: require('../assets/sounds/23.wav'),
  24: require('../assets/sounds/24.wav'),
};

// Function to play a sound
const playSound = async (note) => {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(soundFiles[note]);
    await soundObject.playAsync();
    soundObject.setOnPlaybackStatusUpdate(status => {
      if (status.didJustFinish) {
        soundObject.unloadAsync();
      }
    });
  } catch (error) {
    console.log('Error playing sound:', error);
  }
};

export default function QuizScreen({ navigation }) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [maxInterval, setMaxInterval] = useState(5);

  useEffect(() => {
    const setupAudio = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: false,
      });
    };

    setupAudio();
  }, []);

  // Function to generate a random integer within a range
  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  // Function to generate a random interval
  const generateRandomInterval = () => {
    const isAscending = Math.random() < 0.5;
    let note1, note2, interval;

    if (isAscending) {
      note1 = getRandomInt(0, 12);
      interval = getRandomInt(0, maxInterval);
      note2 = note1 + interval;
    } else {
      note1 = getRandomInt(12, 24);
      interval = getRandomInt(0, maxInterval);
      note2 = note1 - interval;
    }

    return { note1, note2, interval };
  };

  // Function to shuffle array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Function to generate question
  const generateQuestion = () => {
    const { note1, note2, interval } = generateRandomInterval();

    // Define possible interval names
    const intervalNames = ['Unison', 'Minor 2nd', 'Major 2nd', 'Minor 3rd', 'Major 3rd', 'Perfect 4th', 'Tritone', 'Perfect 5th', 'Minor 6th', 'Major 6th', 'Minor 7th', 'Major 7th', 'Octave'];

    // Select the correct answer
    const correctAnswer = intervalNames[interval];

    // Select three unique incorrect answers
    const incorrectAnswers = [];
    while (incorrectAnswers.length < 3) {
      const incorrectAnswer = intervalNames[getRandomInt(0, maxInterval)];
      if (incorrectAnswer !== correctAnswer && !incorrectAnswers.includes(incorrectAnswer)) {
        incorrectAnswers.push(incorrectAnswer);
      }
    }

    // Combine correct and incorrect answers
    const answers = shuffleArray([correctAnswer, ...incorrectAnswers]);

    // Construct question object
    const question = {
      question: `What is the interval between the two notes?`,
      answers,
      correctAnswer,
      note1,
      note2,
    };

    return question;
  };

  // Function to generate multiple questions
  const generateQuestions = (count) => {
    const questions = [];
    for (let i = 0; i < count; i++) {
      questions.push(generateQuestion());
    }
    return questions;
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCompleted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    const generatedQuestions = generateQuestions(10); // Generate 10 interval questions
    setQuestions(generatedQuestions);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const goToNextQuestion = () => {
    const isCorrect = questions[currentQuestion].correctAnswer === selectedAnswer;

    if (isCorrect) {
      setScore(score + 10);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setCompleted(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
    }
  };

  const handleViewScore = () => {
    navigation.navigate('ScoreTab', { score });

    setQuizStarted(false);
    setCompleted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
  };

  const handlePlayInterval = () => {
    const { note1, note2 } = questions[currentQuestion];
    playSound(note1);
    setTimeout(() => {
      playSound(note2);
    }, 500);
  };

  const handleRadioChange = (value) => {
    setChecked(value);
    if (value === 'first') {
      setMaxInterval(5);
    } else if (value === 'second') {
      setMaxInterval(10);
    } else if (value === 'third') {
      setMaxInterval(13);
    }
  };

  const [checked, setChecked] = useState('first');

  return (
    <GradientBackground>
      <View style={styles.container}>
        {!quizStarted && !completed && (
          <>
            <Text style={styles.title}>Ear Training Quiz</Text>
            <View style={styles.radioContainer}>
              <View style={styles.radioButton}>
                <RadioButton
                  value="first"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => handleRadioChange('first')}
                />
                <Text>First level</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton
                  value="second"
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => handleRadioChange('second')}
                />
                <Text>Second level</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton
                  value="third"
                  status={checked === 'third' ? 'checked' : 'unchecked'}
                  onPress={() => handleRadioChange('third')}
                />
                <Text>Third level</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleStartQuiz}>
              <Text style={styles.buttonText}>Start Quiz</Text>
            </TouchableOpacity>
          </>
        )}
        {quizStarted && !completed && (
          <>
            <Text style={styles.question}>{questions[currentQuestion].question}</Text>
            <TouchableOpacity style={styles.playButton} onPress={handlePlayInterval}>
              <Text style={styles.buttonText}>Play Interval</Text>
            </TouchableOpacity>
            {questions[currentQuestion].answers.map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.answerButton,
                  {
                    backgroundColor: selectedAnswer === answer ? 'lightblue' : 'white',
                  },
                ]}
                onPress={() => handleAnswer(answer)}
              >
                <Text>{answer}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.navigation}>
              <Text style={{fontSize: 18}}  >{currentQuestion + 1}/{questions.length} Question</Text>
              <TouchableOpacity
                onPress={goToNextQuestion}
                disabled={selectedAnswer === null}
                style={styles.button2}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {completed && (
          <>
            <Text style={styles.title}>Quiz Completed!</Text>
            <TouchableOpacity style={styles.button} onPress={handleViewScore}>
              <Text style={styles.buttonText}>View Score</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </GradientBackground>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  button2: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  playButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 30,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    justifyContent: 'center',
    textAlign:'center',
    alignItems: 'center'
  },
  answerButton: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
  },
  radioContainer: {
    justifyContent: 'center',
    alignItems: 'left',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: -3,  // Reduced margin to decrease space between radio buttons
  },
});