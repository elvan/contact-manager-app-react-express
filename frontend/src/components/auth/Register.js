import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthState';

const Register = () => {
  const initialUser = {
    name: '',
    email: '',
    password: '',
    password2: '',
  };

  const [user, setUser] = useState(initialUser);

  const { name, email, password, password2 } = user;

  const { isLoading, error, register, clearErrors } = useContext(AuthContext);

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (name === '' || email === '' || password === '') {
      alert('Please enter all fields');
    } else if (password !== password2) {
      alert('Passwords do not match');
    } else {
      clearErrors();
      register({
        name,
        email,
        password,
      });
      if (!error) {
        setUser(initialUser);
      }
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>

      {error && (
        <div className={`alert alert-danger`}>
          <i className='fas fa-info-circle' /> {error}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength={6}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            id='password2'
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength={6}
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
