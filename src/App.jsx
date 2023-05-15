import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Main, Profit } from "./pages/index.js";
import { BurgerMenu, Sidebar } from "./components";
import { useEffect, useState } from "react";
const Layout = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === "/";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    // Відключення прослуховування подій при розмонтовці компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {!hideSidebar && (isMobile ? <BurgerMenu /> : <Sidebar />)}
      <div className="main-content">
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/profit" exact element={<Profit />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
};

export default App;
