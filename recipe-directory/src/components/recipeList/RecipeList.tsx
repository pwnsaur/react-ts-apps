import './RecipeList.css';
import { IRecipe } from '../../types';
import { NavLink } from 'react-router-dom';

const RecipeList = ({ recipes }: { recipes: IRecipe[] }) => {
  if (!recipes.length) {
    return <div className='error'>Stay hungry!</div>;
  }

  return (
    <div className='recipe-list'>
      {recipes &&
        recipes.map(recipe => (
          <div key={recipe.id} className='card'>
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
