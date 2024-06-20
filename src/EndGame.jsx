import React from "react";
import * as styles from "./EndGame.module.css";

export const EndGame = ({ score }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2>You Win!</h2>
        <p>Your score is {score}</p>
        <button onClick={() => window.location.reload()}>New Game</button>
      </div>
    </div>
  );
};
