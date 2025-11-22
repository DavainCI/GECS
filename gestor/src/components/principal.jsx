import React, { useState, useEffect } from 'react';
import './principal.css';
import CrearCita from './crearcita';
import HorasDelDia from './horas';

const Principal = ({ currentUser, onLogout }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showCrearCita, setShowCrearCita] = useState(false);
  const [citas, setCitas] = useState([]);
  const [loadingCitas, setLoadingCitas] = useState(false);
  const [showHorasDelDia, setShowHorasDelDia] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  // Cargar citas al cambiar de mes o al montar el componente
  useEffect(() => {
    fetchCitasDelMes();
  }, [currentDate]);

  // Función para obtener las citas del mes actual
  const fetchCitasDelMes = async () => {
    setLoadingCitas(true);
    try {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      
      const response = await fetch(`http://localhost:5000/api/citas/mes?year=${year}&month=${month}`);
      const data = await response.json();
      
      if (data.success) {
        setCitas(data.citas);
      }
    } catch (error) {
      console.error('Error al cargar citas:', error);
    } finally {
      setLoadingCitas(false);
    }
  };

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
        setFechaSeleccionada(dayDate);
        setShowHorasDelDia(true);
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

  // Función para verificar si un día tiene citas
  const tieneCitas = (day) => {
    if (!day) return false;
    
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = dayDate.toISOString().split('T')[0];
    
    return citas.some(cita => {
      const citaDate = new Date(cita.fecha).toISOString().split('T')[0];
      return citaDate === dateString;
    });
  };

  // Función para obtener el número de citas en un día
  const getNumeroCitas = (day) => {
    if (!day) return 0;
    
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = dayDate.toISOString().split('T')[0];
    
    // Contar solo IDs únicos para evitar duplicados en el array de citas
    const ids = new Set();
    citas.forEach(cita => {
      const citaDate = new Date(cita.fecha).toISOString().split('T')[0];
      if (citaDate === dateString && cita.id != null) {
        ids.add(cita.id);
      }
    });

    // Si por alguna razón no hay IDs, caer de nuevo al conteo por fecha
    if (ids.size === 0) {
      return citas.filter(cita => {
        const citaDate = new Date(cita.fecha).toISOString().split('T')[0];
        return citaDate === dateString;
      }).length;
    }

    return ids.size;
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
          <button 
            className="action-btn" 
            onClick={() => setShowCrearCita(true)}
          >
            crear cita
          </button>
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
              {loadingCitas && <span className="loading-indicator"> Cargando...</span>}
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
                const hasAppointments = tieneCitas(day);
                const appointmentCount = getNumeroCitas(day);
                
                return (
                  <div 
                    key={index} 
                    className={`calendar-day ${day ? '' : 'empty'} ${isPast ? 'past' : 'clickable'} ${isSelected ? 'selected' : ''} ${hasAppointments ? 'has-appointment' : ''}`}
                    onClick={() => handleSelectDay(day)}
                    role={day ? 'button' : undefined}
                    aria-disabled={isPast ? true : undefined}
                  >
                    {day}
                    {hasAppointments && (
                      <div className="appointment-indicator">
                        <span className="appointment-dot"></span>
                        {appointmentCount > 1 && (
                          <span className="appointment-count">{appointmentCount}</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leyenda de citas */}
          <div className="calendar-legend">
            <div className="legend-item">
              <div className="legend-color has-appointment"></div>
              <span>Días con citas</span>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Crear Cita */}
      <CrearCita 
        isOpen={showCrearCita}
        onClose={() => {
          setShowCrearCita(false);
          fetchCitasDelMes(); // Recargar citas después de crear una nueva
        }}
        currentUser={currentUser}
      />

      <HorasDelDia 
        isOpen={showHorasDelDia}
        onClose={() => {
            setShowHorasDelDia(false);
            setFechaSeleccionada(null);
        }}
        fecha={fechaSeleccionada}
        currentUser={currentUser}
      />
    </div>
  );
};

export default Principal;