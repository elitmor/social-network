import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';
import { login } from '../../redux/auth-reducer';
import { getCaptchaUrl, getIsAuth } from '../../redux/auth-selectors';
import style from './login.module.css';

interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: null | string;
}

const schema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
  rememberMe: yup.boolean().oneOf([true], 'Remember me is required'),
});

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const captchaUrl = useSelector(getCaptchaUrl);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    dispatch(
      // @ts-ignore
      login(data.email, data.password, data.rememberMe, setError, data.captcha),
    );
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
        {captchaUrl && (
          <img
            src={captchaUrl}
            alt='captchaUrl'
          />
        )}
        {captchaUrl && (
          <div>
            <input
              placeholder='please enter characters'
              {...register('captcha')}
              className={errors.email ? style.errorInput : ''}
            />
          </div>
        )}
        <Button
          variant='contained'
          type='submit'
        >
          Login
        </Button>
      </form>
    </div>
  );
};
