import React, { useState, useEffect } from "react";
import * as styles from "./App.module.css";

const App = () => {
  const [chosen, setChosen] = useState([]);
  const [opened, setOpened] = useState([]);
  const [cards, setCards] = useState([
    1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8,
  ]);

  useEffect(() => {
    shuffleArray(cards);
  }, []);

  useEffect(() => {
    if (chosen.length === 2) {
      if (chosen[0] !== chosen[1]) {
        const temp = [...opened];
        temp.pop();
        temp.pop();
        setTimeout(() => {
          setOpened(temp);
        }, 500);
      }
      setChosen([]);
    }
  }, [chosen]);

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

  const handleCardClick = (id) => {
    setOpened([...opened, id]);
    setChosen([...chosen, cards[id]]);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Doggo Game</h1>
      </div>
      <div className={styles.field}>
        {cards.map((cardId, id) => (
          <div
            className={`${styles.card} ${
              opened.findIndex((openId) => openId === id) !== -1
                ? styles.chosen
                : ""
            }`}
            onClick={() => {
              handleCardClick(id);
            }}
          >
            <div className={styles.cardContent}>
              <div className={styles.cardFront}></div>
              <div className={styles.cardBack}>
                <img src={`./static/images/${cardId}.png`} alt="shiba-inu" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
