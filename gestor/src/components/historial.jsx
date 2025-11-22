import React, { useState, useEffect } from 'react';
import './historial.css';

const Historial = ({ currentUser, onBack }) => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todas');

  useEffect(() => {
    fetchHistorialCitas();
  }, [filter]);

  const fetchHistorialCitas = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/citas/historial?usuario_id=${currentUser?.id}&filter=${filter}&rol_id=${currentUser?.rol_id}`
      );
      const data = await response.json();
      
      if (data.success) {
        setCitas(data.citas);
      }
    } catch (error) {
      console.error('Error al cargar historial de citas:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatHora = (horaString) => {
    const hora = new Date(`2000-01-01T${horaString}`);
    return hora.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstadoClass = (estado) => {
    switch (estado) {
      case 'pendiente': return 'estado-pendiente';
      case 'confirmada': return 'estado-confirmada';
      case 'completada': return 'estado-completada';
      case 'cancelada': return 'estado-cancelada';
      default: return '';
    }
  };

  const getEstadoText = (estado) => {
    switch (estado) {
      case 'pendiente': return 'Pendiente';
      case 'confirmada': return 'Confirmada';
      case 'completada': return 'Completada';
      case 'cancelada': return 'Cancelada';
      default: return estado;
    }
  };

  // Función para determinar si mostrar la columna de cliente
  const mostrarColumnaCliente = currentUser?.rol_id !== 3;

  return (
    <div className="historial-container">
      {/* Header */}
      <header className="historial-header">
        <div className="user-info">
          <span className="username">{currentUser?.username || 'Usuario'}</span>
          <span className="user-role">
            {currentUser?.rol_id === 1 && '(Administrador)'}
            {currentUser?.rol_id === 2 && '(Estilista)'}
            {currentUser?.rol_id === 3 && '(Cliente)'}
          </span>
          <button onClick={onBack} className="back-btn">
            Volver al Calendario
          </button>
        </div>
        <h1 className="historial-title">
          {currentUser?.rol_id === 3 ? 'Mis Citas' : 'Historial de Citas'}
        </h1>
      </header>

      {/* Main Content */}
      <main className="historial-main">
        {/* Filtros */}
        <div className="filtros-section">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'todas' ? 'active' : ''}`}
              onClick={() => setFilter('todas')}
            >
              Todas
            </button>
            <button 
              className={`filter-btn ${filter === 'pendientes' ? 'active' : ''}`}
              onClick={() => setFilter('pendientes')}
            >
              Pendientes
            </button>
            <button 
              className={`filter-btn ${filter === 'confirmadas' ? 'active' : ''}`}
              onClick={() => setFilter('confirmadas')}
            >
              Confirmadas
            </button>
            <button 
              className={`filter-btn ${filter === 'completadas' ? 'active' : ''}`}
              onClick={() => setFilter('completadas')}
            >
              Completadas
            </button>
            <button 
              className={`filter-btn ${filter === 'canceladas' ? 'active' : ''}`}
              onClick={() => setFilter('canceladas')}
            >
              Canceladas
            </button>
          </div>
        </div>

        {/* Tabla de Citas */}
        <div className="tabla-section">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Cargando historial de citas...</p>
            </div>
          ) : citas.length === 0 ? (
            <div className="no-citas">
              <p>No se encontraron citas {filter !== 'todas' ? `con estado ${filter}` : ''}</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="citas-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    {mostrarColumnaCliente && <th>Cliente</th>}
                    <th>Servicio</th>
                    <th>Estado</th>
                    <th>Precio</th>
                    <th>Notas</th>
                  </tr>
                </thead>
                <tbody>
                  {citas.map((cita) => (
                    <tr key={cita.id} className="cita-row">
                      <td className="fecha-col">{formatFecha(cita.fecha)}</td>
                      <td className="hora-col">{formatHora(cita.hora)}</td>
                      {mostrarColumnaCliente && (
                        <td className="cliente-col">
                          <div className="cliente-info">
                            <div className="cliente-nombre">{cita.cliente_nombre || cita.cliente_username}</div>
                          </div>
                        </td>
                      )}
                      <td className="servicio-col">{cita.nombre_servicio || 'Servicio'}</td>
                      <td className="estado-col">
                        <span className={`estado-badge ${getEstadoClass(cita.estado)}`}>
                          {getEstadoText(cita.estado)}
                        </span>
                      </td>
                      <td className="precio-col">
                        {cita.precio_final 
                          ? `$${parseFloat(cita.precio_final).toFixed(2)}` 
                          : 'No definido'}
                      </td>
                      <td className="notas-col">
                        <div className="notas-text">
                          {cita.notas || 'Sin notas'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Resumen */}
        <div className="resumen-section">
          <div className="resumen-card">
            <h3>Resumen</h3>
            <div className="resumen-stats">
              <div className="stat-item">
                <span className="stat-number">{citas.filter(c => c.estado === 'pendiente').length}</span>
                <span className="stat-label">Pendientes</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{citas.filter(c => c.estado === 'confirmada').length}</span>
                <span className="stat-label">Confirmadas</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{citas.filter(c => c.estado === 'completada').length}</span>
                <span className="stat-label">Completadas</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{citas.filter(c => c.estado === 'cancelada').length}</span>
                <span className="stat-label">Canceladas</span>
              </div>
              <div className="stat-item total">
                <span className="stat-number">{citas.length}</span>
                <span className="stat-label">Total</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Historial;