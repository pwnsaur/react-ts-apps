import { useEffect, useState } from 'react';
import { Card } from './types/index';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { src: '/img/helmet-1.png', matched: false },
  { src: '/img/potion-1.png', matched: false },
  { src: '/img/ring-1.png', matched: false },
  { src: '/img/scroll-1.png', matched: false },
  { src: '/img/shield-1.png', matched: false },
  { src: '/img/sword-1.png', matched: false },
];

const App = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<null | Card>(null);
  const [choiceTwo, setChoiceTwo] = useState<null | Card>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setIsDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setIsDisabled(true);

      // return a new array with matched: 'true' for matched pair
      if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
        setCards(prevCards =>
          prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else return card;
          })
        );

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => shuffleCards(), []);

  return (
    <div className='App'>
      <h1>LET&#39;S FUCKING GOOOOOOOO</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            isFlipped={card === choiceOne || card === choiceTwo || card.matched}
            isDisabled={isDisabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
};

export default App;
