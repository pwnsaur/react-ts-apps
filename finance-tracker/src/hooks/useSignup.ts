import { useState, Dispatch, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res.user) {
        throw new Error('Could not complete the signup');
      }

      await res.user.updateProfile({ displayName });

      dispatch && dispatch({ type: 'LOGIN', payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
        // navigate('/');
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
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { error, signup, isPending };
};
