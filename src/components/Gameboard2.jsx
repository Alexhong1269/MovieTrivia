import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import bgImg from "../images/cinema.jpeg";

const StyledGameboard = styled.div`
  background: url(${bgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  h2 {
    color: gold;
    align-self: flex-end;
    margin-right: 100px;
  }
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80vw;
`;

const CategoryCard = styled.div`
  flex: 1;
  text-align: center;
  font-weight: bold;
  padding: 5px;
  margin: 5px;
  font-size: 40px;
  color: GOLD;
`;

const Card = styled.div`
  background-color: darkkhaki;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 5px;
  width: 100%;
  height: 120px;
  border: 1px solid #ccc;
  box-shadow: 6px 2px 2px black;
  text-align: center;
  &:hover {
    background-color: black;
    color: darkkhaki;
    cursor: pointer;
  }
  font-size: 2rem;
`;

const StyledButton = styled.button`
  background-color: darkkhaki;
  color: black;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.1s, color 0.1s;
  height: 70%;

  &:hover {
    background-color: black;
    color: darkkhaki;
  }
`;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

const Modal = ({ isOpen, onClose, question }) => {
  if (!isOpen) return null;

  let options = [];
  if (question) {
    options = shuffleArray(
      [
        question["Correct Answer"],
        question["Answer 1"],
        question["Answer 2"],
        question["Answer 3"],
        question["Answer 4"],
      ].filter((option, index, self) => self.indexOf(option) === index)
    );
  }
  return (
    <div
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "cneter",
        flexDirection: "column",
        textAlign: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "darkkhaki",
        position: "fixed",
        padding: "20px",
        zIndex: 1000,
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        {question.Question}
      </h1>
      {options.map((option, index) => (
        <StyledButton key={index} onClick={() => console.log(option)}>
          {option}
        </StyledButton>
      ))}
      <StyledButton onClick={onClose} style={{ marginTop: "20px" }}>
        Close
      </StyledButton>
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
        <h2>SCORE: 0</h2>
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
