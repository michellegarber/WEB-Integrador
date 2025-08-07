import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!credentials.username || !credentials.password) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    const result = await login(credentials);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="login-bg">
      <div className="main-content">
        <div className="login-card">
          <Link to="/" className="back-btn">← Regresar</Link>

          <div className="login-header text-center mb-8">
            <div className="login-header-icon">
              <LogIn size={32} color="white" />
            </div>
            <h2 className="login-header-title">
              ¡Hola de nuevo!
            </h2>
            <p className="login-header-subtitle">
              Accede a tu cuenta
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label htmlFor="username" className="flex items-center gap-2">
                <Mail size={16} />
                Correo electrónico
              </label>
              <input
                type="email"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
                required
                className="login-input"
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
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="login-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="login-password-toggle"
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
            
            <div className="space-y-3">
              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-full"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="loading-spinner"></div>
                    Cargando ...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn size={18} />
                    Entrar
                  </div>
                )}
              </button>
            </div>
          </form>
          
          <div className="text-center mt-6">
            <p>
              ¿Todavía no estás registrado?{' '}
              <Link to="/register" className="login-register-link">Crea tu cuenta</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
