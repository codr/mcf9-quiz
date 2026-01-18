import { useState } from 'react';

import './App.css';
import { QUESTIONS, getResultsMessage } from './questions';

interface Response {
  questionId: number;
  rating: number;
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Response[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;

  const handleRating = (rating: number) => {
    const newResponse: Response = { questionId: currentQuestion.id, rating };
    setResponses((prev) => {
      const filtered = prev.filter((r) => r.questionId !== currentQuestion.id);
      return [...filtered, newResponse];
    });

    if (isLastQuestion) {
      // Quiz complete
      setTimeout(() => setQuizComplete(true), 300);
    } else {
      // Move to next question
      setTimeout(() => setCurrentIndex((prev) => prev + 1), 300);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setResponses([]);
    setQuizComplete(false);
  };

  const getTotalScore = () => {
    if (responses.length === 0) return 0;
    const sum = responses.reduce((acc, response) => {
      const question = QUESTIONS.find((q) => q.id === response.questionId);
      let score = response.rating;
      if (question?.reversed) {
        score = 6 - response.rating; // Reverse: 5->1, 4->2, 3->3, 2->4, 1->5
      }
      return acc + score;
    }, 0);
    return sum;
  };

  if (quizComplete) {
    const results = getResultsMessage(getTotalScore());
    return (
      <div className="quiz-container">
        <h1>Quiz Complete!</h1>
        <div className="results-card">
          <div className="average-rating">
            <span className="average-label">Total Score</span>
            <span className="average-value">{getTotalScore()}</span>
          </div>

          <div className={`score-bracket`}>
            <span className="bracket-label">{results.category}</span>
            <p className="bracket-message">{results.message}</p>
          </div>

          <button onClick={resetQuiz} className="nav-button reset-button">
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>

      <div className="question-card">
        <h2>{currentQuestion.text}</h2>

        <div className="rating-scale">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              className={`rating-button ${
                responses.find((r) => r.questionId === currentQuestion.id)
                  ?.rating === rating
                  ? 'selected'
                  : ''
              }`}
              onClick={() => handleRating(rating)}
            >
              {rating}
            </button>
          ))}
        </div>
        <div className="scale-labels">
          <span>Strongly Disagree</span>
          <span>Strongly Agree</span>
        </div>
      </div>

      <div className="progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="navigation">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="nav-button"
        >
          ← Previous
        </button>
        <span className="question-number">
          {currentIndex + 1}/{QUESTIONS.length}
        </span>
        <button onClick={resetQuiz} className="nav-button reset-button">
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
