"use client";

import { useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

type QuizCardProps = {
  question: Question;
};

export default function QuizCard({ question }: QuizCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3">{question.question}</h3>

      <div className="space-y-2">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(option)}
            className={`w-full text-left px-4 py-2 border rounded-md ${
              selected === option
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300"
            }`}
            disabled={isSubmitted}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selected || isSubmitted}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md disabled:bg-gray-400"
      >
        Submit
      </button>

      {isSubmitted && (
        <p
          className={`mt-3 font-semibold ${
            selected === question.answer ? "text-green-600" : "text-red-600"
          }`}
        >
          {selected === question.answer
            ? " Correct!"
            : ` Wrong. Correct Answer: ${question.answer}`}
        </p>
      )}
    </div>
  );
}
