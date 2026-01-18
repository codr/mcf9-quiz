import { useState } from "react";
import "./App.css";

interface Question {
  id: number;
  text: string;
  reversed?: boolean;
}

interface Response {
  questionId: number;
  rating: number;
}

// MCF-9 questions
const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Learning a practical vocation is more beneficial to society than theoretical studies.",
  },
  { id: 2, text: "I trust science.", reversed: true },
  { id: 3, text: "Children should be shaped by a firm hand." },
  {
    id: 4,
    text: "When push comes to shove, those who are prepared will survive.",
  },
  {
    id: 5,
    text: "We need to prepare for a wave of break-ins, robberies and other crimes in the future.",
  },
  {
    id: 6,
    text: 'The discussions about sexual assault have led to a situation where even friendly gestures and complements are hyped up as "sexual assault".',
  },
  {
    id: 7,
    text: "Social support does more than harsh prison sentences.",
    reversed: true,
  },
  {
    id: 8,
    text: "The democratic politicians of today are better than the dictators of the past.",
    reversed: true,
  },
  {
    id: 9,
    text: "The conservative values and norms are still the best way to live.",
  },
];

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

  const getScoreBracket = () => {
    const score = getTotalScore();
    const threshold1 = 22;
    const threshold2 = 31;

    if (score <= threshold1) {
      return {
        category: "Low",
        color: "low",
        message:
          "You likely prioritize individual autonomy, nuance, and skepticism towards traditional authority.",
      };
    } else if (score <= threshold2) {
      return {
        category: "Moderate",
        color: "moderate",
        message:
          'You value a balance between social order and personal freedom, though you might lean towards "safety" when things feel chaotic.',
      };
    } else {
      return {
        category: "High",
        color: "high",
        message:
          'This indicates a high "Authoritarian Personality" profile. You likely have a strong preference for clear hierarchies, traditional moral codes, and decisive leadership to maintain social stability.',
      };
    }
  };

  if (quizComplete) {
    const bracket = getScoreBracket();
    return (
      <div className="quiz-container">
        <h1>Quiz Complete!</h1>
        <div className="results-card">
          <div className="average-rating">
            <span className="average-label">Total Score</span>
            <span className="average-value">{getTotalScore()}</span>
          </div>

          <div className={`score-bracket`}>
            <span className="bracket-label">{bracket.category}</span>
            <p className="bracket-message">{bracket.message}</p>
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
                  ? "selected"
                  : ""
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
