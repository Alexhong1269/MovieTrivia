import React, { useState, useEffect } from "react";
import axios from "axios";

function Gameboard() {
  const [questions, setQuestions] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get("/gameboard");
  //         console.log(response);
  //         setQuestions(response.data);
  //       } catch (err) {
  //         console.error("There was an error fetching the questions", err);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  useEffect(() => {
    axios
      .get("/gameboard", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  //   Logic to display and handle question clicks, manage state for scores, etc.

  return (
    <div className="jeopardy-board">
      <h1>Score</h1>
      {questions.map((question) => (
        <div key={question.id} className="question">
          {/* Display question difficulty and question data here */}
        </div>
      ))}
    </div>
  );
}

export default Gameboard;
