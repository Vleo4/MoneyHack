import React, { useState } from "react";
import "../Login/Login.css";
import images from "../../constants/images";
import useResizer from "../../constants/isMobile";
import { saveToLocalStorage } from "../../api/tokenStorage.js";
import { Link } from "react-router-dom";
import {onFailure, onSuccess, registerApi} from "../../api/api.js";
import { isAuth } from "../../api/AuthContext.jsx";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import {Loader} from "../../components/index.js";

const Register = () => {
  const isMobile = useResizer();
  const [loading,setLoading]=useState(false);
  const [button, setButton] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState(null);
  const [login, setLogin] = useState(null);
  const [isActiveLogin, setIsActiveLogin] = useState(true);
  const [isActiveEmail, setIsActiveEmail] = useState(true);
  const [isActivePass, setIsActivePass] = useState(true);
  const [eye, setEye] = useState(false);
  const [alert, setAlert] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isPass, setIsPass] = useState(true);
  const handleLoginChange = (event) => {
    setIsLogin(true);
    setLogin(event.target.value);
  };
  const handlePassChange = (event) => {
    setIsPass(true);
    setPass(event.target.value);
  };
  const handleEmailChange = (event) => {
    setIsEmail(true);
    setEmail(event.target.value);
  };
  const [alertTxt, setAlertTxt] = useState("");

  const loginApi = async () => {
    setAlert(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emailCheck = emailRegex.test(email);
    const digits = /^[0-9]*$/;
    const passOnlyDigits = digits.test(pass);
    if (login.length < 4) {
      setIsLogin(false);
      setAlertTxt("Login is incorrect");
      setAlert(true);
    } else if (!emailCheck) {
      setIsEmail(false);
      setAlertTxt("Email is incorrect");
      setAlert(true);
    } else if (pass.length < 6 || passOnlyDigits) {
      setIsPass(false);
      setAlertTxt("Password is incorrect");
      setAlert(true);
    } else {
      setLoading(true);
      const data = await registerApi(login, email, pass);
      if (data.data.access) {
        saveToLocalStorage("ACCESS_TOKEN", data.data.access);
        saveToLocalStorage("REFRESH_TOKEN", data.data.refresh);
        window.location.href = "/profit";
      } else {
        setAlertTxt("Username already exists");
        setAlert(true);
      }
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (login && pass && email) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [login, pass, email]);
  React.useEffect(() => {
    if (isAuth()) {
      window.location.href = "/profit";
    }
  }, [isAuth()]);
  return (
    <div className="login">
      <div className="MENTAL">MONEYHACK</div>
      <div className="login__login">
        <div className="login__block">
          {loading?
              <div className="loading-screen">
                <Loader/>
              </div>
              :
              <>
          <div className="login__block__mini">
            <div className="login__text__welcome">Створити аккаунт!</div>
            {alert && (
              <div className="login__alert">
                <span key={alertTxt}>{alertTxt}</span>
                <img
                  src={images.CloseAlert}
                  onClick={() => {
                    setAlert(false);
                  }}
                  alt={"closeAlert"}
                />
              </div>
            )}
            <div className="login__text">Ім'я користувача</div>
            <div
              className={
                isActiveLogin
                  ? isLogin
                    ? "login__input__block"
                    : "login__input__block__false"
                  : "login__input__block__active"
              }
            >
              <img src={images.User} alt={"UserIcon"} />
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
            </div>
            <div className="login__text">Електронна пошта</div>
            <div
              className={
                isActiveEmail
                  ? isEmail
                    ? "login__input__block"
                    : "login__input__block__false"
                  : "login__input__block__active"
              }
            >
              <img src={images.Mail} alt="mail"/>
              <input
                className="login__input"
                onChange={handleEmailChange}
                onBlur={() => {
                  setIsActiveEmail(true);
                }}
                onClick={() => {
                  setIsActiveEmail(false);
                }}
                type="text"
                placeholder="user@email.com"
              />
            </div>
            <div className="login__text">Пароль</div>
            <div
              className={
                isActivePass
                  ? isPass
                    ? "login__input__block"
                    : "login__input__block__false"
                  : "login__input__block__active"
              }
            >
              <img src={images.Pin} alt="Pin"/>
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
                placeholder="Потрібно 6+ символів"
              />
              <img
                src={eye ? images.OpenEye : images.CloseEye}
                onClick={() => {
                  setEye(!eye);
                }}
                className="eye"
                alt={"Eye"}
              />
            </div>
            <div
              onClick={loginApi}
              className={button ? "login__button" : "login__button__disabled"}
            >
                <span>Продовжити</span>
            </div>
              <div className="login__account">
                Вже є аккаунт?
              </div>
                  <Link to="/login" className="login__account-span">
                    Авторизуватися
                  </Link>
            <div className="login__or__block">
              <span className="login__or__left"></span>
              <p className="login__text">Або</p>
              <span className="login__or__right"></span>
            </div>
            <div className="google__button-login">
              <GoogleOAuthProvider clientId="298908062102-2p5834iihc65s1qtua2oskkff673u8cn.apps.googleusercontent.com">
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
          </div>
              </>
          }
        </div>
      </div>
      {alert && <span className="login__footer"></span>}
    </div>
  );
};

export default Register;
