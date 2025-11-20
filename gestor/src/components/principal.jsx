import React, { useState } from 'react';
import './principal.css';

const Principal = ({ currentUser, onLogout }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  
  // Función para cambiar al mes anterior (ahora evita retroceder antes del mes actual)
  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    
    // No permitir ir a meses anteriores al mes actual
    const now = new Date();
    const minDate = new Date(now.getFullYear(), now.getMonth(), 1); // primer día del mes actual
    
    if (new Date(newDate.getFullYear(), newDate.getMonth(), 1) >= minDate) {
      setCurrentDate(newDate);
    }
  };
  
  // Función para cambiar al mes siguiente (permite como máximo el siguiente mes)
  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    
    // Verificar que no sea más de 1 mes después del actual
    const now = new Date();
    const maxDate = new Date(now.getFullYear(), now.getMonth() + 1, 1); // primer día del siguiente mes
    
    if (new Date(newDate.getFullYear(), newDate.getMonth(), 1) <= maxDate) {
      setCurrentDate(newDate);
    }
  };
  
  // Seleccionar día (solo si no es pasado)
  const handleSelectDay = (day) => {
    if (!day) return;
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (dayDate >= todayStart) {
      setSelectedDay(day);
      // aquí podrías abrir un modal o navegar a creación de cita
    }
  };
  
  // Función para obtener los días del mes
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const days = [];
    
    // Días vacíos al inicio
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };
  
  const days = getDaysInMonth(currentDate);
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
                     "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  return (
    <div className="principal-container">
      {/* Header */}
      <header className="principal-header">
        <div className="user-info">
          <span className="username">{currentUser?.username || 'Usuario'}</span>
          <button onClick={onLogout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
        <nav className="navigation">
          <button className="nav-btn">ver historial</button>
          <button className="nav-btn">ver mis citas</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="principal-main">
        <div className="actions-section">
          <button className="action-btn">crear cita</button>
          <div className="search-date">
            <input 
              type="text" 
              placeholder="buscar fecha"
              className="search-input"
            />
          </div>
        </div>

        {/* Calendar Section */}
        <div className="calendar-section">
          <div className="calendar-header">
            <button 
              className="month-nav-btn" 
              onClick={prevMonth}
              disabled={ new Date(currentDate.getFullYear(), currentDate.getMonth(), 1) <= new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
            >
              ‹
            </button>
            <h2 className="month-title">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button 
              className="month-nav-btn" 
              onClick={nextMonth}
              disabled={ new Date(currentDate.getFullYear(), currentDate.getMonth(), 1) >= new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1) }
            >
              ›
            </button>
          </div>
          
          <div className="calendar">
            {/* Day headers */}
            <div className="calendar-week">
              {dayNames.map(day => (
                <div key={day} className="calendar-day-header">{day}</div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="calendar-days">
              {days.map((day, index) => {
                const today = new Date();
                const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const dayDate = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null;
                const isPast = dayDate && (dayDate < todayStart);
                const isSelected = day === selectedDay;
                return (
                  <div 
                    key={index} 
                    className={`calendar-day ${day ? '' : 'empty'} ${isPast ? 'past' : 'clickable'} ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectDay(day)}
                    role={day ? 'button' : undefined}
                    aria-disabled={isPast ? true : undefined}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Principal;