import { useState } from "react";
import "./App.css";

interface Question {
  id: number;
  text: string;
}

interface Response {
  questionId: number;
  rating: number;
}

const QUESTIONS: Question[] = [
  { id: 1, text: "This quiz app is easy to use" },
  { id: 2, text: "I would recommend this to others" },
  { id: 3, text: "The interface is intuitive" },
  { id: 4, text: "I found the rating scale helpful" },
  { id: 5, text: "I would use this app again" },
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

  const getAverageRating = () => {
    if (responses.length === 0) return 0;
    const sum = responses.reduce((acc, r) => acc + r.rating, 0);
    return sum;
  };

  if (quizComplete) {
    return (
      <div className="quiz-container">
        <h1>Quiz Complete!</h1>
        <div className="results-card">
          <div className="average-rating">
            <span className="average-label">Total Score</span>
            <span className="average-value">{getAverageRating()}</span>
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
