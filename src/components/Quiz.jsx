import { useCallback, useState } from 'react';
import Questions from '../questions.js';
import Question from './Question.jsx';
import Summary from './Summary.jsx';


export default function Quiz() {
  const [userAnswers, setUserAnswer] = useState([])

  const activeQuestionIndex = userAnswers.length; //derived from userAnswers array

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswer((prevAnswers) => {
      return [...prevAnswers,
        selectedAnswer]
    });
    
  }, [])

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

  const quizCompleted = activeQuestionIndex === Questions.length;

  if (quizCompleted) {
    return <Summary userAnswers={userAnswers} />
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  )
}
