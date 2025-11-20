import React, { useState, useEffect } from 'react';
import Login from './components/login.jsx';
import Principal from './components/principal.jsx'; // Asegúrate de importar Principal

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    // Verificar si hay una sesión activa en localStorage
    try {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setIsLoggedIn(true);
        setCurrentUser(parsedUser);
      }
    } catch (error) {
      console.error('Error al cargar la sesión:', error);
      localStorage.removeItem('currentUser');
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsLoggedIn(true);
        setCurrentUser(data.user);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, message: 'Error de conexión con el servidor' };
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Redirigir al componente Principal cuando el usuario esté logueado
  return <Principal currentUser={currentUser} onLogout={handleLogout} />;
}

export default App;