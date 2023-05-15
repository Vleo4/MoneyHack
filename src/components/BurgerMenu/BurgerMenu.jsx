import { Link } from "react-router-dom";
import "./BurgerMenu.css";
import { images } from "../../constants";
import { useState } from "react";

const BurgerMenu = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <div className="burgermenu-container">
      <div className="burger-button" onClick={handleToggleMenu}>
        <span className={`top-span ${toggleMenu ? "rotate-top" : ""}`}></span>
        <span className={`middle-span ${toggleMenu ? "hide" : ""}`}></span>
        <span
          className={`bottom-span ${toggleMenu ? "rotate-bottom" : ""}`}
        ></span>
      </div>
      {toggleMenu && (
        <div className="burgermenu">
          <div className="burgermenu-wrapper">
            <div className="burgermenu-profile">
              <img src={images.Profile} alt="Profile" />
              <p>Username</p>
            </div>
            <span></span>
            <Link
              to="/profit"
              className="burgermenu-item"
              style={{ marginBottom: 48 }}
              onClick={handleToggleMenu}
            >
              <img src={images.Profit} alt="Profit" />
              <p>Профіт</p>
            </Link>
            <Link
              to="/loss"
              className="burgermenu-item"
              style={{ marginBottom: 48 }}
              onClick={handleToggleMenu}
            >
              <img src={images.Spend} alt="Spend" />
              <p>Витрати</p>
            </Link>
            <Link
              to="/credits"
              className="burgermenu-item"
              style={{ marginBottom: 48 }}
              onClick={handleToggleMenu}
            >
              <img src={images.Credit} alt="Credit" />
              <p>Кредити</p>
            </Link>
            <Link
              to="/deposits"
              className="burgermenu-item"
              style={{ marginBottom: 48 }}
              onClick={handleToggleMenu}
            >
              <img src={images.Deposit} alt="Deposit" />
              <p>Депозити</p>
            </Link>
            <Link
              to="/reports"
              className="burgermenu-item"
              style={{ marginBottom: 48 }}
              onClick={handleToggleMenu}
            >
              <img src={images.Report} alt="Report" />
              <p>Звіти</p>
            </Link>
          </div>
          <div className="burgermenu-item" onClick={handleToggleMenu}>
            <img src={images.Logout} alt="Logout" />
            <p>Вийти</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
