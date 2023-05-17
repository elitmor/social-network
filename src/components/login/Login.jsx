import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import style from './login.module.css';

const schema = yup.object().shape({
  login: yup.string().required('Login is required'),
  password: yup.string().required('Password is required'),
  rememberMe: yup.boolean().oneOf([true], 'Remember me is required'),
});

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
          {...register('login')}
          className={errors.login ? style.errorInput : ''}
        />
        {errors.login && (
          <p className={style.errorMessage}>{errors.login.message}</p>
        )}
        <input
          type='password'
          placeholder='Password'
          {...register('password')}
          className={errors.password ? style.errorInput : ''}
        />
        {errors.password && (
          <p className={style.errorMessage}>{errors.password.message}</p>
        )}
        <label>
          <input
            type='checkbox'
            {...register('rememberMe')}
          />
          remember me
        </label>
        {errors.rememberMe && (
          <p className={style.errorMessage}>{errors.rememberMe.message}</p>
        )}
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};
