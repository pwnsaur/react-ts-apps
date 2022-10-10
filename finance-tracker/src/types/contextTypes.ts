/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase from 'firebase';
import { Dispatch } from 'react';

export type AuthContextType = {
  user: firebase.User | null;
  authIsReady: boolean;
  dispatch?: Dispatch<any>;
};
