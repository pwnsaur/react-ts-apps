import { useReducer, useEffect, useState } from 'react';
import { projectFs, timeStamp } from '../firebase/config';
import { TrasactionType } from '../types/transactionTypes';

type State = {
  document: object | null;
  isPending: boolean;
  error: Error | null;
  success: boolean | null;
};

const initialState: State = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

type Action = {
  type: 'IS_PENDING' | 'ADD_DOC' | 'DELETE_DOC' | 'ERROR';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
};

const firestoreReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        document: null,
        isPending: true,
        error: null,
        success: false,
      };
    case 'ADD_DOC':
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case 'DELETE_DOC':
      return {
        document: null,
        isPending: false,
        error: null,
        success: true,
      };
    case 'ERROR':
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection: string) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = projectFs.collection(collection);

  // only dispatch if component is not unmounted
  const safeDispatch = (action: Action) => {
    if (isCancelled) {
      dispatch(action);
    }
  };

  const addDoc = async (doc: TrasactionType) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const createdAt = timeStamp.fromDate(new Date());
      const addedDoc = await ref.add({ ...doc, createdAt });

      safeDispatch({
        type: 'ADD_DOC',
        payload: addDoc,
      });
    } catch (error) {
      if (error instanceof Error) {
        safeDispatch({
          type: 'ERROR',
          payload: error.message,
        });
      }
    }
  };

  const deleteDoc = async (id: string | undefined) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      await ref.doc(id).delete();

      safeDispatch({
        type: 'DELETE_DOC',
      });
    } catch (error) {
      if (error instanceof Error) {
        safeDispatch({
          type: 'ERROR',
          payload: error.message,
        });
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { addDoc, deleteDoc, response };
};
