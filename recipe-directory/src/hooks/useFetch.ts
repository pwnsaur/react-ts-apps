import { useState, useEffect } from 'react';
import { IRecipe } from '../types/recipeTypes';

interface Options {
  method: string;
  headers: {
    'Content-Type': string;
  };
  body: string;
}

export const useFetch = (url: string, method = 'GET') => {
  const [data, setData] = useState<null | IRecipe[]>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [options, setOptions] = useState<null | Options>(null);

  const postData = (postData: IRecipe) => {
    setOptions({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions: Options | null) => {
      setIsPending(true);

      try {
        const res = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });
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

    if (method === 'GET') {
      fetchData(null);
    }
    if (method === 'POST' && options) {
      fetchData(options);
    }

    return () => controller.abort();
  }, [url, options, method]);

  return { data, isPending, error, postData };
};
