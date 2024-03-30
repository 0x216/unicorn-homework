// import logo from './logo.svg';
import "./assets/styles/App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import HomePage from "./features/home/HomePage";

import ProtectedRoute from "./features/auth/ProtectedRoute";
import LogoutPage from "./features/auth/LogoutPage";
import RegisterPage from "./features/auth/RegisterPage";
import ProfilePage from "./features/user/ProfilePage";

import NavBar from "./components/layout/NavBar";

function App() {
  return (
    <Router>
      <NavBar /> {}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
