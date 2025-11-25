import React, { useState } from 'react';
import './login.css';
import logo from '../images/logo.png';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Llamar a la función de login del App.js
    const result = await onLogin(username, password);

    if (!result.success) {
      setError(result.message || 'Error en el inicio de sesión');
    }
    
    setIsLoading(false);
  };

  // Datos de demostración
  const demoAccounts = [
    { username: 'admin', password: 'demo123', rol: 'Administrador' },
    { username: 'maria_estilista', password: 'demo123', rol: 'Estilista' },
    { username: 'juan_cliente', password: 'demo123', rol: 'Cliente' }
  ];

  const fillDemoAccount = (account) => {
    setUsername(account.username);
    setPassword(account.password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-section">
          <img src={logo} alt="Glamour Express Logo" className="logo" />
          <h2 className="salon-subtitle">Glamour Express</h2>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;