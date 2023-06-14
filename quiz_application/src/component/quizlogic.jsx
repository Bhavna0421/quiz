import React, { useState } from "react";
import { quizQuestion } from "../quizquestion/quiz";
import QuizResult from "./Result";

function QuizLogic() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showContainer, setShowContainer] = useState(false);

  const handleStartQuiz = () => {
    setShowContainer(true);
  };

  const changeQuestion = () => {
    updateScore();
    if (currentQuestion < quizQuestion.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(0);
    } else {
      setShowResult(true);
    }
  };

  const updateScore = ()  => {
    if (clickedOption === quizQuestion[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
  };

  return (
    <div>
      {/* if user click on start the quiz button then show question container */}
      {!showContainer ? (
        <>
          <h1>Welcome! Let's start the quiz. Click on the button below</h1>
          <button className="start" onClick={handleStartQuiz}>
            Start the Quiz
          </button>
        </>
      ) : (
        <div className="container">
          {/* if complete all questions show result with graph and text also */}
          {showResult ? (
            <QuizResult
              score={score}
              totalScore={quizQuestion.length}
              tryAgain={resetAll}
            />
          ) : (
            // question container when user click on start the quiz button it will show question container
            <>
              <div className="question">
                <span id="question-number">{currentQuestion + 1}. </span>
                <span id="question-txt">
                  {quizQuestion[currentQuestion].question}
                </span>
              </div>
              <div className="options">
                {/* mapping the options */}
                {quizQuestion[currentQuestion].options.map((option, i) => {
                  return (
                    <button
                      className={`option-btn ${
                        clickedOption === i + 1 ? "checked" : null
                      }`}
                      key={i}
                      onClick={() => setClickedOption(i + 1)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {/* next button */}
              <input
                type="button"
                value="Next"
                className="next"
                onClick={changeQuestion}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default QuizLogic;
