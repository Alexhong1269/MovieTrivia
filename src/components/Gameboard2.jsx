import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const StyledGameboard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  h2 {
    align-self: flex-end;
    margin-right: 100px;
  }
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CategoryCard = styled.div`
  flex: 1;
  text-align: center;
  font-weight: bold;
  padding: 5px;
  margin: 5px;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 5px;
  width: 130px;
  height: 130px;
  border: 1px solid #ccc;
  text-align: center;
  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

const Modal = ({ isOpen, onClose, question }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        zIndex: 1000,
      }}
    >
      <h2>{question.Question}</h2>
      <div>{question["Correct Answer"]}</div>
      <div>{question["Answer 1"]}</div>
      <div>{question["Answer 2"]}</div>
      <div>{question["Answer 3"]}</div>
      <div>{question["Answer 4"]}</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const Gameboard2 = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/gameboard`
        );
        setQuestions(res.data);
        const uniqueCategories = [...new Set(res.data.map((q) => q.Category))];
        setCategories(uniqueCategories.slice(0, 5));
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleCardClick = (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  // Assuming each category should have 5 questions (for a total of 25 questions + 5 categories)
  const renderBoard = () => {
    // Create an array to hold JSX for the category row and question rows
    let boardRows = [];

    // First, add a row for categories
    boardRows.push(
      <FlexRow key="categories">
        {categories.map((category, index) => (
          <CategoryCard key={index} style={{ fontWeight: "bold" }}>
            {category}
          </CategoryCard>
        ))}
      </FlexRow>
    );

    // Generate rows for questions. Assuming 5 questions per category for a standard Jeopardy board
    for (let i = 0; i < 5; i++) {
      let questionRow = categories.map((category, categoryIndex) => {
        // Find a question for this category and difficulty level
        const question = questions.find(
          (q) => q.Category === category && q.Difficulty === (i + 1) * 100
        );

        // Use the question's difficulty as the display, and set up a click handler
        return (
          <Card
            key={`${categoryIndex}-${i}`}
            onClick={() => handleCardClick(question)}
          >
            ${question ? question.Difficulty : ""}
          </Card>
        );
      });

      // Add this row of questions to the boardRows array
      boardRows.push(<FlexRow key={`row-${i}`}>{questionRow}</FlexRow>);
    }

    return boardRows;
  };

  return (
    <>
      <StyledGameboard>
        <h2>Score: 0</h2>
        <div className="gameboard">{renderBoard()}</div>
      </StyledGameboard>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        question={selectedQuestion || {}}
      />
    </>
  );
};

export default Gameboard2;
