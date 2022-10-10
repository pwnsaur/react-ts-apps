import { useEffect, useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import firebase from 'firebase/app';
import { TransactionFormProps } from '../../types/transactionTypes';

const TransactionForm = ({ uid }: TransactionFormProps) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const { addDoc, response } = useFirestore('transactions');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addDoc({ name, amount: parseInt(amount), uid });
  };

  useEffect(() => {
    console.log(response.success);
    if (response.success) {
      setName('');
      setAmount('');
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction Name:</span>
          <input
            type='text'
            required
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type='number'
            required
            onChange={e => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button type='submit'>Add Transaction</button>
      </form>
    </>
  );
};

export default TransactionForm;
