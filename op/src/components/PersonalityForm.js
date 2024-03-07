// components/PersonalityForm.js
import React, { useState } from "react";
import "./PersonalityForm.css";

export const PersonalityForm = ({ onSubmit }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [personality, setPersonality] = useState("");

  const questions = [
    "Which One Piece character would you most likely ally with in a battle?",
    "What would you do if you found the One Piece treasure?",
    "Which Devil Fruit power would you prefer?",
    "Which One Piece island would you like to explore?",
    "If you were a pirate, what would your bounty poster say?",
  ];

  const questionOptions = [
    ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Usopp", "Sanji"],
    [
      "Share it with friends and allies",
      "Use it to achieve your dreams",
      "Protect it from those who seek to misuse its power",
      "Trade it for something valuable",
      "Leave it untouched as a symbol",
    ],
    [
      "Rubber (Gomu Gomu no Mi)",
      "Fire (Mera Mera no Mi)",
      "Ice (Hie Hie no Mi)",
      "Sand (Suna Suna no Mi)",
      "Human (Hito Hito no Mi)",
    ],
    [
      "Skypiea",
      "Wano Country",
      "Whole Cake Island",
      "Fish-Man Island",
      "Dressrosa",
    ],
    [
      "Brave and Adventurous",
      "Sharp-witted and Cunning",
      "Kind-hearted and Compassionate",
      "Mysterious and Elusive",
      "Bold and Fearless",
    ],
  ];

  const handleOptionChange = (option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionIndex] = option;
    setSelectedOptions(updatedOptions);
    setQuestionIndex(questionIndex + 1);

    if (questionIndex === questions.length - 1) {
      const personalityResult = determinePersonality(updatedOptions);
      setPersonality(personalityResult);
      onSubmit(personalityResult);
    }
  };

  const determinePersonality = (options) => {
    // You can implement your logic here to determine personality based on selected options
    // For simplicity, just returning the options joined with a space
    return options.join(" ");
  };

  return (
    <div className="personality-form">
      {questionIndex < questions.length ? (
        <>
          <div className="options">
            <h3 className="question">{questions[questionIndex]}</h3>
            {questionOptions[questionIndex].map((option, index) => (
              <div key={index} className="option">
                <input
                  className="inputs"
                  type="radio"
                  id={`option-${index}`}
                  name="option"
                  value={option}
                  checked={selectedOptions[questionIndex] === option}
                  onChange={() => handleOptionChange(option)}
                />
                <label htmlFor={`option-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="personality-result">
          <h3>Your personality is:</h3>
          <p>{personality}</p>
        </div>
      )}
    </div>
  );
};
