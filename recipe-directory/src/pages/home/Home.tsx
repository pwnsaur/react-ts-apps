import './Home.css';
import { RecipeList } from '../../components/index';
import { db } from '../../firestore/config';
import { useEffect, useState } from 'react';
import { IRecipe } from '../../types/recipeTypes';

const Home = () => {
  const [data, setData] = useState<IRecipe[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setIsPending(true);

    const unsub = db.collection('recipes').onSnapshot(
      snapshot => {
        if (snapshot.empty) {
          console.log('Stay hungry!');
          setIsPending(false);
          return;
        }
        const recipes: IRecipe[] = [];
        snapshot.forEach(doc => {
          recipes.push({ id: doc.id, ...doc.data() } as IRecipe);
        });
        setData(recipes);
        setIsPending(false);
      },
      error => {
        setError(true);
        setIsPending(false);
      }
    );

    return () => unsub();
  }, []);

  return (
    <div className='home'>
      {error && <p className='error'>error</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Home;
