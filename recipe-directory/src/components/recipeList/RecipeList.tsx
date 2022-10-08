import './RecipeList.css';
import { IRecipe } from '../../types/recipeTypes';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const RecipeList = ({ recipes }: { recipes: IRecipe[] }) => {
  const { mode } = useTheme() || {};
  if (!recipes.length) {
    return <div className='error'>Stay hungry!</div>;
  }

  return (
    <div className='recipe-list'>
      {recipes &&
        recipes.map(recipe => (
          <div key={recipe.id} className={`card ${mode}`}>
            <h3>{recipe.title}</h3>
            <p>{recipe.cookingTime} to make</p>
            <div>{recipe.method.substring(0, 100)}...</div>
            <NavLink to={`/recipes/${recipe.id}`}>Cook This</NavLink>
          </div>
        ))}
    </div>
  );
};

export default RecipeList;
