import { useForm } from 'react-hook-form';
import style from './login.module.css';

export const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h2>Login</h2>
      <form
        className={style.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          placeholder='Login'
          {...register('login', { required: true })}
        />
        <input
          type={'password'}
          placeholder='Password'
          {...register('password', { required: true })}
        />
        <label>
          <input
            type='checkbox'
            {...register('rememberMe')}
          />
          remember me
        </label>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};
