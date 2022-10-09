import { createContext, Dispatch, useReducer } from 'react';
import { AuthContextType } from '../types/contextTypes';
import firebase from 'firebase';

export const AuthContext = createContext<AuthContextType | null>(null);

type Action = {
  type: 'LOGIN' | 'LOGOUT';
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
  });

  console.log('Auth Context Provider', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
