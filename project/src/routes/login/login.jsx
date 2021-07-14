import React, { useRef } from 'react';
import Logo from '../../components/logo/logo';
import { login } from '../../store/api-actions';
import { useDispatch } from 'react-redux';
import { resetSortType } from '../../store/action';

function LoginScreen() {
  const dispatch = useDispatch();

  const onSubmit = (authData) => {
    dispatch(login(authData));
    dispatch(resetSortType());
  };
  const emailRef = useRef();
  const passwordRef = useRef();

  // const onPasswordInput = () => {
  //   if (passwordRef.current.value.chartAt(0) === ' ') {
  //     passwordRef.current.value = '';
  //   }
  // };

  const handleSubmit = (evt) => {
    evt.preventDefault();

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
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input ref={emailRef} className="login__input form__input" type="email" name="email" placeholder="Email" required="" />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required="" />
              </div>
              <button onClick={handleSubmit} className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <p className="locations__item-link">
                <span>Amsterdam</span>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>);
}

export default LoginScreen;
