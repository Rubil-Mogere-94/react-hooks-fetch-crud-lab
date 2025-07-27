import React from "react";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h4>{question.prompt}</h4>
            <select
              value={String(question.correctIndex)} // Convert to string
              onChange={(e) => 
                onUpdateQuestion(question.id, parseInt(e.target.value))
              }
              aria-label="Correct Answer"
            >
              {question.answers.map((answer, index) => (
                <option key={index} value={String(index)}> {/* Convert to string */}
                  {answer}
                </option>
              ))}
            </select>
            <button onClick={() => onDeleteQuestion(question.id)}>
              Delete Question
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;