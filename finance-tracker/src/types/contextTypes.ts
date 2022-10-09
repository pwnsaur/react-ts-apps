import firebase from 'firebase';
import { Dispatch } from 'react';

export type AuthContextType = {
  user: firebase.User | null;
  dispatch: Dispatch<any> | any;
};
