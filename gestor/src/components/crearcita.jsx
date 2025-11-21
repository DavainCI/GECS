import React, { useState, useEffect } from 'react';
import './crearcita.css';

const CrearCita = ({ isOpen, onClose, currentUser }) => {
  const [servicios, setServicios] = useState([]);
  const [formData, setFormData] = useState({
    servicio_id: '',
    fecha: '',
    hora: '',
    notas: ''
  });
  const [loading, setLoading] = useState(false);

  // Cargar servicios al abrir el modal
  useEffect(() => {
    if (isOpen) {
      fetchServicios();
    }
  }, [isOpen]);

    const fetchServicios = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/citas/servicios');
        const data = await response.json();
        if (data.success) {
        setServicios(data.servicios);
        } else {
        console.error('Error en la respuesta:', data.message);
        }
    } catch (error) {
        console.error('Error al cargar servicios:', error);
    }
    };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/citas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          usuario_id: currentUser.id
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Cita creada exitosamente');
        onClose();
        resetForm();
      } else {
        alert('Error al crear cita: ' + data.message);
      }
    } catch (error) {
      console.error('Error al crear cita:', error);
      alert('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      servicio_id: '',
      fecha: '',
      hora: '',
      notas: ''
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Obtener fecha mínima (hoy)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Crear Nueva Cita</h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="cita-form">
          <div className="form-group">
            <label htmlFor="servicio_id">Servicio *</label>
            <select
              id="servicio_id"
              name="servicio_id"
              value={formData.servicio_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecciona un servicio</option>
              {servicios.map(servicio => (
                <option key={servicio.id} value={servicio.id}>
                  {servicio.nombre} - ${servicio.precio_minimo} a ${servicio.precio_maximo}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="fecha">Fecha *</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleInputChange}
              min={getMinDate()}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="hora">Hora *</label>
            <select
              id="hora"
              name="hora"
              value={formData.hora}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecciona una hora</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="13:00">01:00 PM</option>
              <option value="14:00">02:00 PM</option>
              <option value="15:00">03:00 PM</option>
              <option value="16:00">04:00 PM</option>
              <option value="17:00">05:00 PM</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="notas">Notas adicionales</label>
            <textarea
              id="notas"
              name="notas"
              value={formData.notas}
              onChange={handleInputChange}
              rows="3"
              placeholder="Notas especiales para el servicio..."
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={handleClose}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Creando...' : 'Crear Cita'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearCita;