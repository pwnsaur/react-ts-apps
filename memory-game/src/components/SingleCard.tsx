import './SingleCard.css';
import { Card } from '../types';

interface Props {
  card: Card;
  handleChoice(card: Card): void;
  isFlipped: boolean;
  isDisabled: boolean;
}

const SingleCard = ({ card, handleChoice, isFlipped, isDisabled }: Props) => {
  const handleClick = () => !isDisabled && handleChoice(card);

  return (
    <div className='card'>
      <div className={isFlipped ? 'flipped' : ''}>
        <img className='front' src={card.src} />
        <img onClick={handleClick} className='back' src='/img/cover.png' />
      </div>
    </div>
  );
};

export default SingleCard;
