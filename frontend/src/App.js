import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import HomePage from './features/home/HomePage';

import ProtectedRoute from './features/auth/ProtectedRoute';
import LogoutPage from './features/auth/LogoutPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
