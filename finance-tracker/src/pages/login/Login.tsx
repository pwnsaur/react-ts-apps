import styles from './Login.module.css';
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { login, isPending, error } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className={styles['login-form']} onSubmit={handleSubmit}>
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
      </label>
      {!isPending && <button className='btn'>Login</button>}
      {isPending && (
        <button className='btn' disabled>
          loading
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
