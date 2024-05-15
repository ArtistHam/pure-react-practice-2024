import React, { useState, useEffect } from "react";
import * as styles from "./App.module.css";

const App = () => {
  const [cards, setCards] = useState([
    1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8,
  ]);

  useEffect(() => {
    shuffleArray(cards);
  }, []);

  function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    setCards(copy);
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Doggo Game</h1>
      </div>
      <div className={styles.field}>
        {cards.map((cardId) => (
          <div className={styles.card}>
            <img src={`./static/images/${cardId}.png`} alt="shiba-inu" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
