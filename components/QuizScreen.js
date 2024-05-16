import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

// Sound files for each note
const soundFiles = {
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
};

// Function to play a sound
const playSound = async (note) => {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(soundFiles[note]);
    await soundObject.playAsync();
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

  useEffect(() => {
    // Set audio mode and unload sound when unmounting
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

    return () => {
      Audio.Sound.unloadAsync();
    };
  }, []);

  // Function to generate a random integer within a range
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to generate a random interval
  const generateRandomInterval = () => {
    const note1 = getRandomInt(0, 11); // Randomly select first note (0 to 11 represents 12 notes)
    let note2 = getRandomInt(0, 11); // Randomly select second note
    while (note2 === note1) {
      // Ensure the second note is different from the first one
      note2 = getRandomInt(0, 11);
    }

    // Calculate the interval between the two notes
    const interval = (note2 - note1 + 12) % 12;

    return { note1, note2, interval };
  };

  // Function to generate question
// Function to generate question
const generateQuestion = () => {
  const { note1, note2, interval } = generateRandomInterval();

  // Define possible interval names
  const intervalNames = ['Unison', 'Minor 2nd', 'Major 2nd', 'Minor 3rd', 'Major 3rd', 'Perfect 4th', 'Tritone', 'Perfect 5th', 'Minor 6th', 'Major 6th', 'Minor 7th', 'Major 7th', 'Octave'];

  // Shuffle the interval names array
  const shuffledIntervalNames = intervalNames.sort(() => Math.random() - 0.5);

  // Select the correct answer
  const correctAnswer = intervalNames[interval];

  // Select three incorrect answers (ensure they are not the correct answer)
  const incorrectAnswers = shuffledIntervalNames.filter(name => name !== correctAnswer).slice(0, 3);

  // Combine correct and incorrect answers
  const answers = [correctAnswer, ...incorrectAnswers];

  // Shuffle the answers array
  const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

  // Construct question object
  const question = {
    question: `What is the interval between the two notes?`,
    answers: shuffledAnswers,
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
    console.log(questions[currentQuestion])
    const isCorrect = questions[currentQuestion].correctAnswer === selectedAnswer;

    if (isCorrect) {
      const newScore = score + 10;
      setScore(newScore);
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
    navigation.navigate('Score', { score });
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

  return ( <View style={styles.container}>
  {!quizStarted && !completed && (
    <>
      <Text style={styles.title}>Ear Training Quiz</Text>
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
              backgroundColor:
                selectedAnswer === answer ? 'lightblue' : 'white',
            },
          ]}
          onPress={() => handleAnswer(answer)}
          disabled={selectedAnswer !== null}
        >
          <Text>{answer}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.navigation}>
        <TouchableOpacity onPress={goToPreviousQuestion}>
          <Text>Previous</Text>
        </TouchableOpacity>
        <Text>
          {currentQuestion + 1}/{questions.length} Question
        </Text>
        <TouchableOpacity
          onPress={goToNextQuestion}
          disabled={selectedAnswer === null}>
          <Text>Next</Text>
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
  playButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
});
