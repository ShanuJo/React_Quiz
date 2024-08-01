import React from 'react';
import Logo from '../assets/quiz-logo.png'

export default function Header() {
  return (
    <header>
        <img src={Logo} />
        <h1>React Quiz</h1>
    </header>
  )
}
