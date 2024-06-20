import React, { useState, useEffect } from "react";
import { EndGame } from "./EndGame";
import * as styles from "./App.module.css";

const App = () => {
  const [chosen, setChosen] = useState([]);
  const [opened, setOpened] = useState([]);
  const [score, setScore] = useState(100);
  const [turnCount, setTurnCount] = useState(0);
  const [cards, setCards] = useState([
    1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8,
  ]);

  useEffect(() => {
    shuffleArray(cards);
  }, []);

  useEffect(() => {}, [opened]);

  useEffect(() => {
    if (chosen.length === 2) {
      setTurnCount(turnCount + 1);
      if (turnCount > 8) {
        setScore(Math.ceil(score - Math.log10(score)));
      }
      if (chosen[0] === chosen[1]) {
        setChosen([]);
      } else {
        const temp = [...opened];
        temp.pop();
        temp.pop();
        setTimeout(() => {
          setOpened(temp);
          setChosen([]);
        }, 500);
      }
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
    if (chosen.length !== 2) {
      setOpened([...opened, id]);
      setChosen([...chosen, cards[id]]);
    }
  };

  return (
    <div className={styles.page}>
      {opened.length === 16 && <EndGame score={score} />}
      <div className={styles.header}>
        <h1>Doggo Game</h1>
      </div>
      <div className={styles.field}>
        <div className={styles.scoreWrapper}>Your score is {score}</div>
        {cards.map((cardId, id) => (
          <div
            className={`${styles.card} ${
              opened.findIndex((openId) => openId === id) !== -1
                ? styles.chosen
                : ""
            }`}
            onClick={() => {
              if (opened.findIndex((openId) => openId === id) === -1) {
                handleCardClick(id);
              }
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
