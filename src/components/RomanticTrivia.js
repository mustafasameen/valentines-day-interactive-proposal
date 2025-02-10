// src/components/RomanticTrivia.js
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/RomanticTrivia.css"; // Import the styles

function RomanticTrivia({ onComplete, setRoses }) {
  const questions = [
    {
      question: "When is our anniversary?",
      options: ["April 15", "May 10", "June 21"],
      answer: "May 10",
    },
    {
      question:
        "Do you know we would have a baby by now if we had fun on the first day?",
      options: ["Yes", "No", "I can't believe it's been 9 months"],
      answer: ["Yes", "I can't believe it's been 9 months"],
    },
    {
      question: "Will you be my Valentine? ❤️",
      options: ["Yes", "No"],
      answer: "Yes",
      isFinal: true, // Mark the final question for special treatment
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [roseCount, setRoseCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("");
  const [noButtonSize, setNoButtonSize] = useState(1); // Shrinking "No" button
  const [finalMessage, setFinalMessage] = useState(false);
  const [showDrumRoll, setShowDrumRoll] = useState(false);
  const [showFinalQuestion, setShowFinalQuestion] = useState(false);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (currentQuestion.isFinal) {
      // Show drum roll effect before revealing final question
      setShowDrumRoll(true);
      setTimeout(() => {
        setShowDrumRoll(false);
        setShowFinalQuestion(true);
      }, 3000); // Delay the reveal
    }
  }, [currentIndex]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption === "") {
      setFeedback("Please select an option.");
      return;
    }

    if (Array.isArray(currentQuestion.answer)) {
      if (currentQuestion.answer.includes(selectedOption)) {
        setFeedback("Correct! You've earned a rose. 🌹");
        setRoseCount((prev) => prev + 1);
        setRoses((prev) => prev + 1);
      } else {
        setFeedback("That's not quite right.");
      }
    } else if (selectedOption === currentQuestion.answer) {
      setFeedback("Correct! You've earned a rose. 🌹");
      setRoseCount((prev) => prev + 1);
      setRoses((prev) => prev + 1);
    } else {
      setFeedback("That's not quite right.");
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption("");
        setFeedback("");
      } else {
        if (selectedOption === "Yes") {
          setTimeout(() => {
            setFinalMessage(true);
            setTimeout(onComplete, 5000);
          }, 1000);
        }
      }
    }, 1500);
  };

  return (
    <div className='romantic-trivia'>
      {!finalMessage ? (
        <AnimatePresence mode='wait'>
          {showDrumRoll ? (
            <motion.div
              key='drum-roll'
              className='drum-roll'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              🥁 Drum Roll... 🥁
            </motion.div>
          ) : showFinalQuestion ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 1 }}
              className='final-question'
            >
              <h2>Romantic Trivia 🌹</h2>
              <p>Answer the questions to earn roses!</p>

              <motion.h3
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                {currentQuestion.question}
              </motion.h3>

              <div className='options'>
                {currentQuestion.options.map((option, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className='option'
                    style={
                      option === "No"
                        ? {
                            transform: `scale(${noButtonSize})`,
                            transition: "transform 0.2s ease-in-out",
                          }
                        : {}
                    }
                  >
                    <label>
                      <input
                        type='radio'
                        name='trivia'
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => {
                          if (
                            option === "No" &&
                            currentQuestion.question ===
                              "Will you be my Valentine? ❤️"
                          ) {
                            setNoButtonSize((prev) => Math.max(prev - 0.2, 0));
                          } else {
                            setSelectedOption(option);
                          }
                        }}
                      />
                      {option}
                    </label>
                  </motion.div>
                ))}
              </div>

              <button className='submit-btn' onClick={handleSubmit}>
                Submit Answer
              </button>

              <div className='feedback'>{feedback}</div>

              <div className='rose-count'>🌹 Roses collected: {roseCount}</div>
            </motion.div>
          ) : (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Romantic Trivia 🌹</h2>
              <p>Answer the questions to earn roses!</p>

              <h3>{currentQuestion.question}</h3>

              <div className='options'>
                {currentQuestion.options.map((option, idx) => (
                  <motion.div key={idx} whileHover={{ scale: 1.1 }}>
                    <label>
                      <input
                        type='radio'
                        name='trivia'
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => setSelectedOption(option)}
                      />
                      {option}
                    </label>
                  </motion.div>
                ))}
              </div>

              <button className='submit-btn' onClick={handleSubmit}>
                Submit Answer
              </button>

              <div className='feedback'>{feedback}</div>

              <div className='rose-count'>🌹 Roses collected: {roseCount}</div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <motion.div
          key='final-message'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 1 }}
          className='final-message'
        >
          <h2>🎉 Yay! 🎉</h2>
          <h3>Happy 9 Months pookie bear!</h3>
          <p>
            I am so excited to go to Mount Princeton Hot Springs with you, get
            dinner, and maybe open up the Skims dress for some Chinese dessert!
            🍜💖
          </p>
          <img
            src='/images/couple.jpeg'
            alt='Us'
            className='final-photo'
            width='300'
            height='400'
          />
        </motion.div>
      )}
    </div>
  );
}

export default RomanticTrivia;
