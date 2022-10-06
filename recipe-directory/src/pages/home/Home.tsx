import './Home.css';
import { useFetch } from '../../hooks/useFetch';
import { url } from '../../globals';
import { RecipeList } from '../../components/index';

const Home = () => {
  const { data, isPending, error } = useFetch(url);

  return (
    <div className='home'>
      {error && <p className='error'>error</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Home;
