import { useState, Dispatch } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await projectAuth.signOut();

      dispatch && dispatch({ type: 'LOGOUT' });

      setIsPending(false);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        setError(err.message);
      }
    }
  };
  return { error, logout, isPending };
};
