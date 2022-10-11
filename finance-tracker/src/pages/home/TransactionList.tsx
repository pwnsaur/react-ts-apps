import styles from './Home.module.css';
import { TrasactionType } from '../../types/transactionTypes';
import { useFirestore } from '../../hooks/useFirestore';

type TransactionListProps = {
  transactions: TrasactionType[];
};

const TransactionList = ({ transactions }: TransactionListProps) => {
  const { deleteDoc } = useFirestore('transactions');

  return (
    <div className={styles.transactions}>
      {transactions.map(transaction => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
          <button onClick={() => deleteDoc(transaction.id)}>X</button>
        </li>
      ))}
    </div>
  );
};

export default TransactionList;
