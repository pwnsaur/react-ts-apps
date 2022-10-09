import './Recipe.css';
import { useParams } from 'react-router-dom';
import { IRecipe } from '../../types/recipeTypes';
import { useTheme } from '../../hooks/useTheme';
import { db } from '../../firestore/config';
import { useEffect, useState } from 'react';

const Recipe = () => {
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { id } = useParams();
  const { mode } = useTheme() || {};

  useEffect(() => {
    setIsPending(true);

    const unsub = db
      .collection('recipes')
      .doc(id)
      .onSnapshot(
        doc => {
          if (!doc.exists) {
            console.log('Stay hungry!');
            setIsPending(false);
            return;
          }
          setRecipe({ id: doc.id, ...doc.data() } as IRecipe);
          setIsPending(false);
        },
        error => {
          setError(true);
          setIsPending(false);
        }
      );

    return () => unsub();
  }, [id]);

  const handleUpdate = () => {
    db.collection('recipes').doc(id).update({
      title: 'Updated title',
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className='error'>error</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipe && (
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p> Takes {recipe.cookingTime} to make.</p>
          <ul>
            {recipe.ingredients.map(ingredient => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className='method'>{recipe.method}</p>
          <button onClick={handleUpdate}>Update me</button>
        </>
      )}
    </div>
  );
};

export default Recipe;
