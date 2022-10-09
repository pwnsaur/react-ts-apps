import styles from './Login.module.css';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
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
      <button className='btn'>Login</button>
    </form>
  );
};

export default Login;
