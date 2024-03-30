import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import bgImg from "../images/cinema2.jpeg";
import { useUser } from "./userContext";

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
    font-size: 1.6rem;
    color: khaki;
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
  font-size: 1.6rem;
  color: khaki;
`;

const Card = styled.div`
  background-color: darkkhaki;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 5px;
  height: 100px;
  border: 1px solid #ccc;
  box-shadow: 6px 2px 2px black;
  text-align: center;
  &:hover {
    background-color: black;
    color: khaki;
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
  height: 140px;
  width: 400px;

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

const Modal = ({ isOpen, onClose, question, handleAnswerClick }) => {
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
        alignItems: "center",
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
      <h1 style={{ marginBottom: "20px" }}>{question.Question}</h1>
      {question &&
        options.map((option, index) => (
          <StyledButton
            key={index}
            onClick={() => {
              handleAnswerClick(option, question);
            }}
          >
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
  const navigate = useNavigate();
  const { user, updateHighscore } = useUser();

  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const redirectToLeaderboard = () => {
    navigate("/leaderboard");
  };

  const GameFinishedModal = ({ isOpen, onRestart }) => {
    if (!isOpen) return null;

    return (
      <div
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          width: "50vw",
          height: "50vh",
          backgroundColor: "darkkhaki",
          position: "fixed",
          padding: "20px",
          zIndex: 1000,
        }}
      >
        <h1>Game Finished!</h1>
        <p>Your score: {score}</p>
        <StyledButton onClick={onRestart}>Play Again</StyledButton>
        <StyledButton onClick={redirectToLeaderboard}>Leaderboard</StyledButton>
      </div>
    );
  };

  const restartGame = () => {
    setIsGameFinished(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/gameboard`
        );
        setQuestions(res.data);
        const uniqueCategories = Array.from(
          new Set(res.data.map((q) => q.Category))
        );
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

  const handleAnswerClick = (option, question) => {
    if (!answeredQuestions.includes(question.Question)) {
      if (option === question["Correct Answer"]) {
        setScore((prevScore) => prevScore + question.Difficulty);
      }
      if (answeredQuestions.length + 1 === 25) {
        console.log("Game should finish");
        setIsGameFinished(true);
      }
      setAnsweredQuestions((prevAnswered) => [
        ...prevAnswered,
        question.Question,
      ]);
      console.log(`Questions answered: ${answeredQuestions.length + 1}`);
      console.log(`Total questions: ${questions.length}`);
      setIsModalOpen(false); // Close the modal after selecting an answer
    }
  };
  useEffect(() => {
    if (isGameFinished) {
      checkAndUpdateHighScore();
    }
  }, [isGameFinished]);

  const checkAndUpdateHighScore = async () => {
    if (user && score > user.highscore) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/updateHighscore`,
          {
            username: user.username,
            highscore: score,
          }
        );
        if (response.status === 200) {
          updateHighscore(highscore);
        }
        console.log(response.data.message);
      } catch (error) {
        console.error("Error updating high score", error);
      }
    }
  };

  const renderBoard = () => {
    let boardRows = [];

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

        return (
          <Card
            key={`${categoryIndex}-${i}`}
            onClick={() => question && handleCardClick(question)}
            style={{
              opacity: answeredQuestions.includes(question?.Question) ? 0.5 : 1,
              pointerEvents: answeredQuestions.includes(question?.Question)
                ? "none"
                : "all",
            }}
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
        <h2>Score: {score}</h2>
        {renderBoard()}
      </StyledGameboard>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        question={selectedQuestion || {}}
        handleAnswerClick={handleAnswerClick} // Passing handleAnswerClick function to Modal
      />
      <GameFinishedModal isOpen={isGameFinished} onRestart={restartGame} />
    </>
  );
};

export default Gameboard2;
