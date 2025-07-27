import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    
    if (name === "answer1") {
      setFormData({
        ...formData,
        answers: [value, formData.answers[1]]
      });
    } else if (name === "answer2") {
      setFormData({
        ...formData,
        answers: [formData.answers[0], value]
      });
    } else if (name === "correctIndex") {
      setFormData({
        ...formData,
        correctIndex: parseInt(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddQuestion(formData);
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
            aria-label="Prompt"
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answers[0]}
            onChange={handleChange}
            aria-label="Answer 1"
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answers[1]}
            onChange={handleChange}
            aria-label="Answer 2"
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
            aria-label="Correct Answer"
          >
            <option value="0">Answer 1</option>
            <option value="1">Answer 2</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;