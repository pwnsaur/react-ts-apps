import './Create.css';
import { useState, useRef } from 'react';

const Create = () => {
  const [title, setTitle] = useState<string>('');
  const [method, setMethod] = useState<string>('');
  const [cookingTime, setCookingTime] = useState<string>('');
  const [newIngredient, setNewIngredient] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const ingredientInput = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const recipe = { title, method, cookingTime, ingredients };
    setTitle('');
    setMethod('');
    setCookingTime('');
    console.log(recipe);
  };

  const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing.length && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, ing]);
    }
    setNewIngredient('');
    ingredientInput.current?.focus();
  };

  return (
    <div className='create'>
      <h2 className='page-title'>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input
            type='text'
            onChange={e => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe ingridients:</span>
          <div className='ingredients'>
            <input
              type='text'
              onChange={e => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className='btn' onClick={handleAddIngredient}>
              add
            </button>
          </div>
          <p>
            Current ingredients:
            {ingredients.map(ingredient => (
              <em key={ingredient}>{ingredient}, </em>
            ))}
          </p>
        </label>

        <label>
          <span>Recipe Method</span>
          <textarea
            onChange={e => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input
            type='number'
            onChange={e => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className='btn'>Submit</button>
      </form>
    </div>
  );
};

export default Create;
