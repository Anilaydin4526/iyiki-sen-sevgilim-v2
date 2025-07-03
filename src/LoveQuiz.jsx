import React, { useState } from 'react';
import './LoveQuiz.css';

const questions = [
  {
    question: 'İlk buluşmamız hangi gündü?',
    options: ['14 Şubat', '1 Mayıs', '1 Ocak', '23 Nisan'],
    answer: 0,
  },
  {
    question: 'Birlikte en çok ne yapmayı severiz?',
    options: ['Film izlemek', 'Yürüyüş yapmak', 'Kahve içmek', 'Hepsi!'],
    answer: 3,
  },
  {
    question: 'En sevdiğimiz şarkı türü?',
    options: ['Rock', 'Pop', 'Romantik', 'Rap'],
    answer: 2,
  },
];

function LoveQuiz() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOption = (idx) => {
    if (idx === questions[step].answer) setScore(score + 1);
    if (step + 1 < questions.length) setStep(step + 1);
    else setShowResult(true);
  };

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">Aşk Testi</h2>
      {!showResult ? (
        <div className="quiz-question">
          <p>{questions[step].question}</p>
          <div className="quiz-options">
            {questions[step].options.map((opt, idx) => (
              <button key={idx} onClick={() => handleOption(idx)}>{opt}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="quiz-result">
          <h3>Sonuç: {score} / {questions.length}</h3>
          <p>{score === questions.length ? 'Mükemmel! Beni çok iyi tanıyorsun 💖' : 'Yine de seni çok seviyorum! 💌'}</p>
        </div>
      )}
    </div>
  );
}

export default LoveQuiz; 