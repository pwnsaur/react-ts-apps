import './RecipeList.css';
import { IRecipe } from '../../types/recipeTypes';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import Trashcan from '../../assets/delete-icon.svg';
import { db } from '../../firestore/config';

const RecipeList = ({ recipes }: { recipes: IRecipe[] }) => {
  const { mode } = useTheme() || {};
  if (!recipes.length) {
    return <div className='error'>Stay hungry!</div>;
  }

  const handleDelete = (id?: string) => {
    if (id) {
      db.collection('recipes')
        .doc(id)
        .delete()
        .then(() => {
          console.log(`Document ${id} successfully deleted!`);
        })
        .catch(err => {
          console.error('Error removing document: ', err);
        });
    }
  };

  return (
    <div className='recipe-list'>
      {recipes &&
        recipes.map(recipe => (
          <div key={recipe.id} className={`card ${mode}`}>
            <h3>{recipe.title}</h3>
            <p>{recipe.cookingTime} to make</p>
            <div>{recipe.method.substring(0, 100)}...</div>
            <NavLink to={`/recipes/${recipe.id}`}>Cook This</NavLink>
            <img
              className='delete'
              src={Trashcan}
              alt='trashcan icon'
              onClick={() => handleDelete(recipe.id)}
            />
          </div>
        ))}
    </div>
  );
};

export default RecipeList;
