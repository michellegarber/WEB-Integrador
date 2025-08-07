import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import './Register.css';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (userData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    const result = await register(userData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="register-bg">
      <div className="register-header">
        <div className="card fade-in">
          <Link to="/" className="back-btn">← Regresar</Link>
          <div className="text-center mb-8">
            <div className="header-icon">
              <UserPlus size={32} color="white" />
            </div>
            <h2 className="header-title">¡Crea tu cuenta!</h2>
            <p className="header-subtitle">Completa tus datos para comenzar</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-2">
              <div className="form-group">
                <label htmlFor="firstName" className="flex items-center gap-2">
                  <User size={16} />
                  Nombre
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="flex items-center gap-2">
                  <User size={16} />
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  placeholder="Tu apellido"
                  required
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username" className="flex items-center gap-2">
                <Mail size={16} />
                Correo electrónico
              </label>
              <input
                type="email"
                id="username"
                name="username"
                value={userData.username}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="flex items-center gap-2">
                <Lock size={16} />
                Clave de acceso
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  minLength="6"
                  className="form-control"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="error">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success btn-lg w-full"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="loading-spinner"></div>
                  Creando cuenta...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} />
                  Crear Cuenta
                </div>
              )}
            </button>
          </form>
          <div className="register-footer">
            <p className="register-footer-text">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="register-link">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
