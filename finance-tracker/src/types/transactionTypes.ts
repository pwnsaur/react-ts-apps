import firebase from 'firebase';

export type TrasactionType = {
  name: string;
  amount: number;
  createdAt?: firebase.firestore.Timestamp;
  uid?: firebase.User['uid'];
  id?: string;
};

export type TransactionFormProps = {
  uid: firebase.User['uid'] | undefined;
};
