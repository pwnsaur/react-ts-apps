import { useState, Dispatch, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      // if (!res.user) {
      //   throw new Error('Could not complete the login');
      // }

      dispatch && dispatch({ type: 'LOGIN', payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
        navigate('/');
      }
    } catch (err) {
      if (!isCancelled) {
        if (err instanceof Error) {
          console.log(err.message);
          setError(err.message);
        }
      }
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { error, login, isPending };
};
