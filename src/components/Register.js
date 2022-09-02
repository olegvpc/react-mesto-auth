import { React, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({onRegister}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return(
    <form className="login-form" onSubmit={handleSubmit}>
      <h3 className="login-form__title">Регистрация</h3>
      <input className="login-form__input login-form__input_login-email" placeholder="Email"
        type="email" onChange={handleEmailChange} required />
      <input className="login-form__input login-form__input_login-pass" placeholder="Пароль"
        type="password" onChange={handlePasswordChange} required/>
      <button className="login-form__button" type="submit">Зарегистрироваться</button>
      <div className="login-form__text">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="login-form__link transition">Войти</Link>
      </div>
    </form>
  )
}

export default Register;