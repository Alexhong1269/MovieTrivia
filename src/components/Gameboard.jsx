import React, { useState } from "react";
import styled from "styled-components";

const StyledGameboard = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 2em;
    color: #fff;
    margin-bottom: 20px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
`;

const Tile = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    height: 12vh;
    min-height: 300px;
    width: calc(20% - 10px); /* 20% width for each tile with 10px gap */
    background: #060CE9;
    margin-bottom: 10px;
    cursor: pointer;
`;

const TileValue = styled.p`
    font-size: 3em;
    color: #ffd700;
    text-shadow: 4px 4px black;
    margin: 0;
    padding: 0;
`;

const TileQuestion = styled.p`
    text-transform: uppercase;
    color: white;
    font-size: 0.6em;
    padding: 2% 5%;
`;

const TotalScore = styled.div`
    font-size: 1.5em;
    color: #fff;
    margin-top: 20px;
`;

const Gameboard = () => {
    const [showing, setShowing] = useState("front");
    const [guess, setGuess] = useState("");
    const [score, setScore] = useState(1000);

    const handleClick = () => {
        setShowing(showing === "front" ? "back" : "front"); // Toggle between front and back
    };

    const handleChange = (e) => {
        setGuess(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check the answer
        const correctAnswer = sampleQuestion.answer.toLowerCase();
        if (guess.toLowerCase() === correctAnswer) {
            changeScore(sampleQuestion.value);
            alert("Correct!");
        } else {
            changeScore(-sampleQuestion.value);
            alert("Sorry! The correct answer was: " + correctAnswer);
        }
        // Clear the guess
        setGuess("");
    };

    const changeScore = (x) => {
        setScore(score + x);
    };

    const sampleQuestion = {
        "answer": "a catapult",
        "question": "Ancient weapon kept a stone's throw from its target",
        "value": 100,
        "airdate": "1985-02-08T12:00:00.000Z",
        "created_at": "2014-02-11T22:47:18.947Z",
        "updated_at": "2014-02-11T22:47:18.947Z",
        "category_id": 6,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 6,
            "title": "'cat'-egory",
            "created_at": "2014-02-11T22:47:18.750Z",
            "updated_at": "2014-02-11T22:47:18.750Z",
            "clues_count": 5
        }
    };

    // Generate tiles
    const tiles = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const value = sampleQuestion.value + i * 100; // Calculate point value
            tiles.push(
                <Tile key={i * 5 + j} onClick={handleClick}>
                    <div className={`tile-front ${showing === "back" ? "hidden" : ""}`}>
                        <TileValue>{value}</TileValue>
                    </div>
                    <div className={`tile-back ${showing === "front" ? "hidden" : ""}`}>
                        <TileQuestion>{sampleQuestion.question}</TileQuestion>
                        <form className="answer-group" onSubmit={handleSubmit}>
                            <input type="text" name="answer-box" onChange={handleChange} value={guess} />
                            <input type="submit" value="Guess!" />
                        </form>
                    </div>
                </Tile>
            );
        }
    }

    // Split tiles into rows
    const rows = [];
    for (let i = 0; i < 5; i++) {
        rows.push(
            <Row key={i}>
                {tiles.slice(i * 5, (i + 1) * 5)}
            </Row>
        );
    }

    return (
        <StyledGameboard>
            <h1>Movie Trivia</h1>
            {rows}
            <TotalScore>Total Score: {score}</TotalScore>
        </StyledGameboard>
    );
};
//stuff here

//I wish u the best wook

export default Gameboard;
