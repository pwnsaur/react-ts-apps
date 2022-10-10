import { createContext, Dispatch, useEffect, useReducer } from 'react';
import { AuthContextType } from '../types/contextTypes';
import firebase from 'firebase';
import { projectAuth } from '../firebase/config';

export const AuthContext = createContext<AuthContextType | null>(null);

type Action = {
  type: 'LOGIN' | 'LOGOUT' | 'AUTH_IS_READY';
  payload: firebase.User | null;
};

const authReducer = (state: AuthContextType, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    case 'AUTH_IS_READY':
      return {
        ...state,
        user: action.payload,
        authIsReady: true,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    projectAuth.onAuthStateChanged(user => {
      const unsub = dispatch({ type: 'AUTH_IS_READY', payload: user });

      return () => unsub;
    });
  }, []);

  console.log('Auth Context Provider', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
