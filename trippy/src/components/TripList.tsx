import './TripList.css';
import { useRef, useState } from 'react';
import { useFetch } from '../hooks/useFetch';

const TripList = (): JSX.Element => {
  const [url, setUrl] = useState<string>('http://localhost:3000/trips');
  const { data: trips, isPending, error } = useFetch(url);
  const urlRef = useRef(url);

  return (
    <div className='trip-list'>
      <h2>Trip List</h2>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <ul>
        {trips &&
          trips.map(trip => (
            <li key={trip.id}>
              <h3>{trip.title}</h3>
              <p>{trip.price}</p>
            </li>
          ))}
      </ul>
      <div className='filters'>
        <button onClick={() => setUrl(`${urlRef.current}?loc=europe`)}>
          European Trips
        </button>
        <button onClick={() => setUrl(`${urlRef.current}`)}>All Trips</button>
      </div>
    </div>
  );
};

export default TripList;
