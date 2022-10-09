import './Search.css';
import { useSearchParams } from 'react-router-dom';
import { RecipeList } from '../../components';
import { db } from '../../firestore/config';
import { useState, useEffect } from 'react';
import { IRecipe } from '../../types/recipeTypes';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    setIsPending(true);

    db.collection('recipes')
      .get()
      .then(docs => {
        if (docs.empty) {
          console.log('Stay hungry!');
          setIsPending(false);
          return;
        }
        docs.forEach(doc => {
          recipes.push({ id: doc.id, ...doc.data() } as IRecipe);
        });
        setRecipes(recipes);
        setIsPending(false);
      })
      .catch(err => {
        setError(true);
        setIsPending(false);
      });
  }, [query]);

  return (
    <div className='home'>
      <h2 className='page-title'>Recipes including: {query}</h2>
      {error && <p className='error'>error</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {/* {data && <RecipeList recipes={filteredRecipes} />} */}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
};

export default Search;
