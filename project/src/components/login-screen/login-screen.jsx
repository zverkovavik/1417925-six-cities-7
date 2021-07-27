import React, { useRef } from 'react';
import Logo from '../../components/logo/logo';
import { login } from '../../store/api-actions';
import { useDispatch } from 'react-redux';
import { resetSortType } from '../../store/action';
import { Link } from 'react-router-dom';
import { changeCity } from '../../store/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { City, Toast } from '../../constants';


function LoginScreen() {
  const dispatch = useDispatch();

  const onSubmit = (authData) => {
    dispatch(login(authData))
      .catch(() => {
        toast.error(Toast.USUAL_ERROR_MESSAGE, {
          position: Toast.POSITION,
          autoClose: Toast.AUTO_CLOSE_TIME,
        });
      });
    dispatch(resetSortType());
  };
  const emailRef = useRef();
  const passwordRef = useRef();

  const handlePasswordInput = () => {
    if ((passwordRef.current.value).slice(0,1) === ' ') {
      passwordRef.current.value = '';
      toast.error(Toast.SPACE_PASSWORD_ERROR, {
        position: Toast.POSITION,
        autoClose: Toast.AUTO_CLOSE_TIME,
      });
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!emailRef.current.value.includes('@')) {
      toast.error(Toast.EMAIL_ERROR, {
        position: Toast.POSITION,
        autoClose: Toast.AUTO_CLOSE_TIME,
      });
      return;
    }

    if (passwordRef.current.value.length <= 3) {
      toast.error(Toast.LENGTH_PASSWORD_ERROR, {
        position: Toast.POSITION,
        autoClose: Toast.AUTO_CLOSE_TIME,
      });
      return;
    }

    onSubmit({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <ToastContainer />
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" data-testid="authorization-form">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={emailRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  data-testid="login"
                  required=""
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  onInput={handlePasswordInput}
                  className="login__input form__input"
                  type="password" name="password"
                  placeholder="Password"
                  autoComplete="off"
                  data-testid="password"
                  required=""
                />
              </div>
              <button onClick={handleSubmit} className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div onClick={() => dispatch(changeCity(City.AMSTERDAM))}className="locations__item">
              <Link className="locations__item-link" to="/">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>);
}

export default LoginScreen;
