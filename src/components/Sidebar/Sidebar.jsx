import { Link } from "react-router-dom";
import { images } from "../../constants";
import "./Sidebar.css";
import { useRef, useState, useEffect } from "react";

const Sidebar = () => {
  const sidebarRef = useRef(null); // Посилання на елемент сайдбару

  const [isOpen, setIsOpen] = useState(false);

  const handleSidebarClick = () => {
    setIsOpen(true);
  };

  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  

  return (
    
    <div
      className={`sidebar ${isOpen ? "open" : ""}`}
      onClick={handleSidebarClick}
      ref={sidebarRef}
    >
      <div className="sidebar-wrapper">
        <div className="sidebar-profile">
          <img src={images.Profile} alt="Profile" />
          <p>Username</p>
        </div>
        <span></span>
        <Link
          to="/profit"
          className="sidebar-item"
          style={{ marginBottom: 48 }}
        >
          <img src={images.Profit} alt="Profit" />
          <p>Профіт</p>
        </Link>
        <Link to="/loss" className="sidebar-item" style={{ marginBottom: 48 }}>
          <img src={images.Spend} alt="Spend" />
          <p>Витрати</p>
        </Link>
        <Link
          to="/credits"
          className="sidebar-item"
          style={{ marginBottom: 48 }}
        >
          <img src={images.Credit} alt="Credit" />
          <p>Кредити</p>
        </Link>
        <Link
          to="/deposits"
          className="sidebar-item"
          style={{ marginBottom: 48 }}
        >
          <img src={images.Deposit} alt="Deposit" />
          <p>Депозити</p>
        </Link>
        <Link
          to="/reports"
          className="sidebar-item"
          style={{ marginBottom: 48 }}
        >
          <img src={images.Report} alt="Report" />
          <p>Звіти</p>
        </Link>
      </div>
      <div className="sidebar-item">
        <img src={images.Logout} alt="Logout" />
        <p>Вийти</p>
      </div>
    </div>
  );
};

export default Sidebar;
