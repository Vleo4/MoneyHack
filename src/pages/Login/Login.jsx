import React, { useState } from "react";
import "./Login.css";
import images from "../../constants/images.js";
import useResizer from "../../constants/isMobile.js";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import {
  saveToLocalStorage,
} from "../../api/tokenStorage.js";
import { Link } from "react-router-dom";
import {loginApi, onFailure, onSuccess} from "../../api/api.js";
import { isAuth } from "../../api/AuthContext.jsx";
import {Loader} from "../../components/index.js";

const Login = () => {
  const isMobile = useResizer();
  const [button, setButton] = useState(false);
  const [pass, setPass] = useState(null);
  const [login, setLogin] = useState(null);
  const [isActiveLogin, setIsActiveLogin] = useState(true);
  const [isActivePass, setIsActivePass] = useState(true);
  const [eye, setEye] = useState(false);
  const [alert, setAlert] = useState(false);
  const [loading,setLoading]=useState(false);
  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };
  const handlePassChange = (event) => {
    setPass(event.target.value);
  };
  React.useEffect(() => {
    if (login && pass) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [login, pass]);
  React.useEffect(() => {
    if (isAuth()) {
      window.location.href = "/profit";
    }
  }, [isAuth()]);

  const loginButton = async () => {
    if(login&&pass) {
      setLoading(true);
      setAlert(false);
      try {
        const {access, refresh} = await loginApi(login, pass);
        saveToLocalStorage('ACCESS_TOKEN', access);
        saveToLocalStorage('REFRESH_TOKEN', refresh);
        window.location.href = "/profit";
      } catch (err) {
        setAlert(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className="login">
      <div className="MENTAL">MONEYHACK</div>
      <div className="login__login">
        <div className="login__block">
          <div className="login__block__mini">
            {loading?
                <div className="loading-screen">
                <Loader/>
                </div>
                :
                <>
            <div className="login__text__welcome">ЛАСКАВО ПРОСИМО</div>
            <div className="login__text__sign">Увійдіть у свій обліковий запис</div>
            {alert && (
              <div className="login__alert">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <span>Неправильне ім'я користувача або пароль.</span>
                <img
                  src={images.CloseAlert}
                  onClick={() => {setAlert(false);}}
                  alt="close"
                />
              </div>
            )}
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
            <div className="login__text">Ім'я користувача</div>
            <div
              className={
                isActiveLogin
                  ? "login__input__block"
                  : "login__input__block__active"
              }
            >
              <img src={images.User} alt="User"/>
              <input
                className="login__input"
                onChange={handleLoginChange}
                onBlur={() => {
                  setIsActiveLogin(true);
                }}
                onClick={() => {
                  setIsActiveLogin(false);
                }}
                type="text"
                placeholder="Username"
              />
              <img src={images.UserIcon} />
            </div>
            <div className="login__text">Пароль</div>
            <div
              className={
                isActivePass
                  ? "login__input__block"
                  : "login__input__block__active"
              }
            >
              <img src={images.Pin} alt="pin"/>
              <input
                className="login__input"
                onChange={handlePassChange}
                onBlur={() => {
                  setIsActivePass(true);
                }}
                onFocus={() => {
                  setIsActivePass(false);
                }}
                type={eye ? "text" : "password"}
                placeholder="Пароль"
              />
              <img
                src={eye ? images.OpenEye : images.CloseEye}
                onClick={() => {
                  setEye(!eye);
                }}
                className="eye"
              />
            </div>
            <div
              onClick={loginButton}
              className={button ? "login__button" : "login__button__disabled"}
            >
                <span>Увійти</span>
            </div>
              <div className="login__account">
                Немає облікового запису?
              </div>
              <Link to="/register" className="login__account-span">
                Зареєструватися
              </Link>
            <div className="login__or__block">
              <span className="login__or__left"></span>
              <p className="login__text">Або</p>
              <span className="login__or__right"></span>
            </div>
            <div className="google__button-login">
              <GoogleOAuthProvider clientId="488276422870-q1thm6trrih9sj4l9k4e22785rt47muu.apps.googleusercontent.com">
                <GoogleLogin
                    size="large"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    text="continue_with"
                    width={isMobile ? 200 : 330}
                    locale="english"
                    useOneTap={true}
                />
              </GoogleOAuthProvider>
            </div>
                </>
            }
          </div>
        </div>
      </div>
      {alert && <span className="login__footer"></span>}
    </div>
  );
};

export default Login;
