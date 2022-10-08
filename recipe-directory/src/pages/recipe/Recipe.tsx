import './Recipe.css';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { IRecipe } from '../../types/recipeTypes';
import { url } from '../../globals';
import { useTheme } from '../../hooks/useTheme';

const Recipe = () => {
  const { id } = useParams();
  const { data: recipe, isPending, error } = useFetch(`${url}${id}`);
  const { mode } = useTheme() || {};

  // they made me do it
  const sketchyRecipe = recipe as unknown as IRecipe;

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className='error'>error</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipe && (
        <>
          <h2 className='page-title'>{sketchyRecipe.title}</h2>
          <p> Takes {sketchyRecipe.cookingTime} to make.</p>
          <ul>
            {sketchyRecipe.ingredients.map(ingredient => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className='method'>{sketchyRecipe.method}</p>
        </>
      )}
    </div>
  );
};

export default Recipe;
