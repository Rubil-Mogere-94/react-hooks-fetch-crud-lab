import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (page === "List") {
      fetchQuestions();
    }
  }, [page]);

  const fetchQuestions = async () => {
    const response = await fetch("/questions");
    const data = await response.json();
    setQuestions(data);
  };

  const handleAddQuestion = async (newQuestion) => {
    const response = await fetch("/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    });
    const createdQuestion = await response.json();
    setQuestions([...questions, createdQuestion]);
    setPage("List");
  };

  const handleDeleteQuestion = async (id) => {
    await fetch(`/questions/${id}`, { method: "DELETE" });
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleUpdateQuestion = (id, correctIndex) => {
    // Optimistic UI update
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, correctIndex } : q
    ));
    
    // Send update to server in background
    fetch(`/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    }).catch(error => console.error("Update error:", error));
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
