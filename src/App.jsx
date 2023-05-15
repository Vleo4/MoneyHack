import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Main } from "./pages/index.js";
const Layout = () => {
  return (
    <>
      <div className="main-content">
        <Routes>
          <Route path="/" exact element={<Main />} />
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
