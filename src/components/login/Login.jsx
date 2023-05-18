import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import style from './login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
  rememberMe: yup.boolean().oneOf([true], 'Remember me is required'),
});

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(login(data.email, data.password, data.rememberMe));
  };

  if (isAuth) {
    return <Navigate to='/profile' />;
  }

  return (
    <div>
      <h2>Login</h2>
      <form
        className={style.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          placeholder='Email'
          {...register('email')}
          className={errors.email ? style.errorInput : ''}
        />
        {errors.email && (
          <p className={style.errorMessage}>{errors.email.message}</p>
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
