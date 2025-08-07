import React from 'react';
import { Link } from 'react-router-dom';
import './MainMenu.css';

const MainMenu = () => (
  <div className="main-menu-bg">
    <div className="main-menu-card">
      <h1 className="main-menu-title">¡MyM Events!</h1>
      <p className="main-menu-desc">Hace un diferencial en tus eventos</p>
      <div className="main-menu-actions">
        <Link to="/login" className="main-menu-btn main-menu-btn-login">Inicia Sesión</Link>
        <Link to="/register" className="main-menu-btn main-menu-btn-register">Registrate</Link>
      </div>
    </div>
  </div>
);

export default MainMenu; 