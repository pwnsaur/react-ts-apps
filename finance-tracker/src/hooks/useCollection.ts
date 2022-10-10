import { useEffect, useState } from 'react';
import { projectFs } from '../firebase/config';
import { TrasactionType } from '../types/transactionTypes';

export const useCollection = (collection: string) => {
  const [docs, setDocs] = useState<TrasactionType[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const ref = projectFs.collection(collection);

    const unsub = ref.onSnapshot(
      snapshot => {
        const results: TrasactionType[] = [];
        snapshot.docs.forEach(doc => {
          results.push({ ...doc.data(), id: doc.id } as TrasactionType);
        });

        setDocs(results);
        setError(null);
      },
      error => {
        console.log(error.message);
        setError({ ...error, message: 'get rekt lmao' });
      }
    );

    return () => unsub();
  }, [collection]);

  return { docs, error };
};
