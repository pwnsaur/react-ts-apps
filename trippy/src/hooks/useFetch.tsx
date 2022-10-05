import { useState, useEffect } from 'react';
import { Trip } from '../types';

export const useFetch = (url: string) => {
  const [data, setData] = useState<Trip[] | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsPending(true);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw Error(res.statusText);
        }
        const json = await res.json();

        setIsPending(false);
        setData(json);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            console.log('fetch aborted');
          } else {
            setIsPending(false);
            setError('get rekt lmao');
            console.log(err.message);
          }
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, isPending, error };
};
