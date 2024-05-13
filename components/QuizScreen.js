import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function QuizScreen({ navigation }) {
  const [resetScore, setResetScore] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: 'What is the capital of France?',
      answers: ['London', 'Paris', 'Berlin', 'Rome'],
      correctAnswer: 'Paris'
    },
    {
        question: 'What is the capital of France?',
        answers: ['London', 'Paris', 'Berlin', 'Rome'],
        correctAnswer: 'Paris'
      },
      {
        question: 'What is the capital of France?',
        answers: ['London', 'Paris', 'Berlin', 'Rome'],
        correctAnswer: 'Paris'
      },
      {
        question: 'What is the capital of France?',
        answers: ['London', 'Paris', 'Berlin', 'Rome'],
        correctAnswer: 'Paris'
      },
    // Add more questions here...
  ];

  const handleStartQuiz = () => {
    setResetScore(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const goToNextQuestion = () => {
    const isCorrect = questions[currentQuestion].correctAnswer === selectedAnswer;
    console.log('Selected Answer:', selectedAnswer);
    console.log('Correct Answer:', questions[currentQuestion].correctAnswer);
    console.log('Is Correct:', isCorrect);
  
    if (isCorrect) {
        const newScore = score + 10;
        console.log('New Score:', newScore);
        setScore(newScore);
      }
  
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Navigate to the score screen and reset quiz state
      if (score === 0) {
        setScore(0);
    } else if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 10);
    }
    console.log('Final Score:', score);
    // Navigate to the score screen and reset quiz state
    navigation.navigate('Score', { score });
    setResetScore(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
    }
  };

  return (
    <View style={styles.container}>
      {resetScore ? (
        <View style={styles.startQuizContainer}>
          <Text style={styles.title}>Welcome to the Quiz</Text>
          <TouchableOpacity style={styles.button} onPress={handleStartQuiz}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.question}>{questions[currentQuestion].question}</Text>
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
              disabled={selectedAnswer === null}
            >
              <Text>Next</Text>
            </TouchableOpacity>
          </View>
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
  startQuizContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
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
