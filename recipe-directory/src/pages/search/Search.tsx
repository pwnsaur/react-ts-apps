import './Search.css';
import { useSearchParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { url } from '../../globals';
import { RecipeList } from '../../components';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const { data, isPending, error } = useFetch(`${url}?q=${query}`);

  // at least this also kinda worked lol
  // const { data, isPending, error } = useFetch(url);
  // const filteredRecipes = data?.filter(recipe =>
  //   recipe.title.toLowerCase().includes(query?.toLowerCase() || '')
  // );

  return (
    <div className='home'>
      <h2 className='page-title'>Recipes including: {query}</h2>
      {error && <p className='error'>error</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {/* {data && <RecipeList recipes={filteredRecipes} />} */}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Search;
