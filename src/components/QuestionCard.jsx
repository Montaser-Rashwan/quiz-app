// components/QuestionCard.jsx
import { useState } from 'react';

const QuestionCard = ({ question, onAnswer, choices }) => {
  const [selected, setSelected] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const handleClick = (choice, index) => {
    if (selected) return;
    const correct = index === question.answer - 1;
    setIsCorrect(correct);
    setSelected(choice);
    setTimeout(() => {
      onAnswer(correct);
    }, 1000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-6">{question.question}</h2>
      <div className="space-y-4">
        {choices.map((choice, i) => (
          <div
            key={i}
            onClick={() => handleClick(choice, i)}
            className={`flex cursor-pointer p-4 border border-blue-100 rounded transition-transform duration-150 hover:shadow-md hover:translate-y-[-0.25rem] ${
              selected === choice
                ? isCorrect
                  ? 'bg-gray-500 text-white'
                  : 'bg-red-500 text-white'
                : ''
            }`}
          >
            <span className="font-bold w-8 text-white bg-primary px-3 py-1 rounded">
              {String.fromCharCode(65 + i)}
            </span>
            <span className="ml-4">{choice}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;