import './Searchbar.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Searchbar = () => {
  const [term, setTerm] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`search?q=${term}`);
  };

  // HACKERMAN
  useEffect(() => {
    if (location.pathname !== '/search') {
      setTerm('');
    }
  }, [navigate]);

  return (
    <div className='searchbar'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='search'>Search</label>
        <input
          type='text'
          id='search'
          onChange={e => setTerm(e.target.value)}
          value={term}
          required
        />
      </form>
    </div>
  );
};

export default Searchbar;
