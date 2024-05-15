import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function QuizScreen({ navigation }) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
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
      question: 'What is the capital of UK?',
      answers: ['London', 'Paris', 'Berlin', 'Rome'],
      correctAnswer: 'London'
    },
    {
      question: 'What is the capital of Greece?',
      answers: ['London', 'Paris', 'Athens', 'Rome'],
      correctAnswer: 'Athens'
    },
    {
      question: 'What is the capital of Italy?',
      answers: ['London', 'Paris', 'Berlin', 'Rome'],
      correctAnswer: 'Rome'
    }
    // Add more questions here...
  ];

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCompleted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const goToNextQuestion = () => {
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

  return (
    <View style={styles.container}>
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
