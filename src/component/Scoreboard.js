import React, { useEffect, useState } from "react";
import axios from "axios";

const Scoreboard = () => {
  const [scores, setScores] = useState([]);
  
  // WebSocket connection
  useEffect(() => {
    const ws = new WebSocket("wss://example.com/scores");

    ws.onmessage = (event) => {
      const newScoreData = JSON.parse(event.data);
      setScores((prevScores) => {
        // Update scores based on received data
        return prevScores.map(score => score.id === newScoreData.id ? newScoreData : score);
      });
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h1>Live Scores</h1>
      <div className="scoreboard">
        {scores.map((score) => (
          <div key={score.id} className="score-card">
            <h2>{score.team1} vs {score.team2}</h2>
            <p>{score.score1} - {score.score2}</p>
            <p>Status: {score.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scoreboard;
