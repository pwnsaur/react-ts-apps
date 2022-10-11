import { useEffect, useState } from 'react';
import { projectFs } from '../firebase/config';
import { TrasactionType } from '../types/transactionTypes';
import firebase from 'firebase';

export const useCollection = (
  collection: string,
  query: [string, string, firebase.User['uid'] | undefined]
) => {
  const [docs, setDocs] = useState<TrasactionType[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const ref = projectFs.collection(collection);

    // if (query) {
    //   ref = ref.where(...query);
    // }

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
