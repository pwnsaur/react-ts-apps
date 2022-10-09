import styles from './Signup.module.css';
import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form className={styles['signup-form']} onSubmit={handleSubmit}>
      <title>Login</title>
      <label>
        <span>email:</span>
        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label>password</label>
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <label>display name</label>
        <input
          type='text'
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
        />
      </label>
      {!isPending && <button className='btn'>Signup</button>}
      {isPending && (
        <button className='btn' disabled>
          loading
        </button>
      )}
      {error && <div>{error}</div>}
    </form>
  );
};

export default Signup;
