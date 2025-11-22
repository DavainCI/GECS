import React, { useState, useEffect } from 'react';
import './historial.css';

const Historial = ({ currentUser, onBack }) => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todas');
  const [editingCita, setEditingCita] = useState(null);
  const [editEstado, setEditEstado] = useState('');
  const [editPrecio, setEditPrecio] = useState('');
  const [saving, setSaving] = useState(false);

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

  // Función para determinar si puede editar (admin o estilista)
  const puedeEditar = currentUser?.rol_id === 1 || currentUser?.rol_id === 2;

  // Función para iniciar edición
  const iniciarEdicion = (cita) => {
    setEditingCita(cita.id);
    setEditEstado(cita.estado);
    setEditPrecio(cita.precio_final || '');
  };

  // Función para cancelar edición
  const cancelarEdicion = () => {
    setEditingCita(null);
    setEditEstado('');
    setEditPrecio('');
  };

  // Función para guardar cambios
  const guardarCambios = async (citaId) => {
    if (!editEstado) {
      alert('Por favor selecciona un estado válido');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`http://localhost:5000/api/citas/${citaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estado: editEstado,
          precio_final: editPrecio ? parseFloat(editPrecio) : null
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Actualizar la lista de citas
        const citasActualizadas = citas.map(cita => 
          cita.id === citaId 
            ? { 
                ...cita, 
                estado: editEstado, 
                precio_final: editPrecio ? parseFloat(editPrecio) : null 
              }
            : cita
        );
        setCitas(citasActualizadas);
        setEditingCita(null);
        alert('Cambios guardados exitosamente');
      } else {
        alert('Error al guardar los cambios: ' + data.message);
      }
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      alert('Error al guardar los cambios');
    } finally {
      setSaving(false);
    }
  };

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
                    {puedeEditar && <th>Acciones</th>}
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
                        {editingCita === cita.id ? (
                          <select 
                            value={editEstado} 
                            onChange={(e) => setEditEstado(e.target.value)}
                            className="estado-select"
                          >
                            <option value="pendiente">Pendiente</option>
                            <option value="confirmada">Confirmada</option>
                            <option value="completada">Completada</option>
                            <option value="cancelada">Cancelada</option>
                          </select>
                        ) : (
                          <span className={`estado-badge ${getEstadoClass(cita.estado)}`}>
                            {getEstadoText(cita.estado)}
                          </span>
                        )}
                      </td>
                      <td className="precio-col">
                        {editingCita === cita.id ? (
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={editPrecio}
                            onChange={(e) => setEditPrecio(e.target.value)}
                            placeholder="Precio"
                            className="precio-input"
                          />
                        ) : (
                          cita.precio_final 
                            ? `$${parseFloat(cita.precio_final).toFixed(2)}` 
                            : 'No definido'
                        )}
                      </td>
                      <td className="notas-col">
                        <div className="notas-text">
                          {cita.notas || 'Sin notas'}
                        </div>
                      </td>
                      {puedeEditar && (
                        <td className="acciones-col">
                          {editingCita === cita.id ? (
                            <div className="acciones-buttons">
                              <button 
                                onClick={() => guardarCambios(cita.id)}
                                disabled={saving}
                                className="btn-guardar"
                              >
                                {saving ? 'Guardando...' : 'Guardar'}
                              </button>
                              <button 
                                onClick={cancelarEdicion}
                                disabled={saving}
                                className="btn-cancelar"
                              >
                                Cancelar
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => iniciarEdicion(cita)}
                              className="btn-editar"
                            >
                              Editar
                            </button>
                          )}
                        </td>
                      )}
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