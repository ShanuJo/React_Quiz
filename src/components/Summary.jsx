import React from 'react'
import QUESTIONS from '../questions.js';
import CompleteLogo from '../assets/quiz-complete.png'


export default function Summary({userAnswers}) {
    const skippedAnswers = userAnswers.filter((answer)=> answer === null);
    const correctAnswers = userAnswers.filter((answer,index)=> answer === QUESTIONS[index].answers[0]);

    const skippedAnswerShare = Math.round((skippedAnswers.length/userAnswers.length) * 100);
    const correctAnswerShare = Math.round((correctAnswers.length/userAnswers.length) * 100);
    const wrongAnswerShare = 100 - skippedAnswerShare -correctAnswerShare;

    return (
    <div id="summary">
    <img src={CompleteLogo} alt="Trophy image" />
    <h2>Quiz Completed!</h2>
    <div id="summary-stats">
        <p>
            <span className='number'>{skippedAnswerShare}%</span>
            <span className='text'>Answer skipped</span>
        </p>
        <p>
            <span className='number'>{correctAnswerShare}%</span>
            <span className='text'>Answer correctly</span>
        </p>
        <p>
            <span className='number'>{wrongAnswerShare}%</span>
            <span className='text'>Answer incorrectly</span>
        </p>
    </div>
    <ol>
        {userAnswers.map((answer, index)=>{
            let cssClass = 'user-answer';
            if (answer === null){
                cssClass += ' skipped';
            } else if(answer === QUESTIONS[index].answers[0]){
                cssClass += ' correct';
            } else {
                cssClass += ' wrong';
            }

            return <li key={index}>
            <h3>{index+1}</h3>
            <p className='question'>{QUESTIONS[index].text}</p>
            <p className={cssClass}>{answer ?? 'Skipped'}</p>
            {answer !== QUESTIONS[index].answers[0] && <p className='user-answer correct'>{QUESTIONS[index].answers[0]}</p>}
        </li>
        })}
        
    </ol>
  </div>
  )
}
