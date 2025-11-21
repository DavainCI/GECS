import React, { useState, useEffect } from 'react';
import './horas.css';

const HorasDelDia = ({ isOpen, onClose, fecha, currentUser }) => {
  const [horas, setHoras] = useState([]);
  const [citasDelDia, setCitasDelDia] = useState([]);
  const [loading, setLoading] = useState(false);

  // Horas disponibles de 9am a 5pm
  const horasDisponibles = [
    '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // Cargar citas del día seleccionado
  useEffect(() => {
    if (isOpen && fecha) {
      fetchCitasDelDia();
    }
  }, [isOpen, fecha]);

  const fetchCitasDelDia = async () => {
    setLoading(true);
    try {
      const fechaFormateada = new Date(fecha).toISOString().split('T')[0];
        console.log('=== DEBUG FECHA ===');
        console.log('Fecha original:', fecha);
        console.log('Fecha formateada para API:', fechaFormateada);
        console.log('==================');
      
      const response = await fetch(`http://localhost:5000/api/citas/dia?fecha=${fechaFormateada}`);
      
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      
      const data = await response.json();
      console.log('TODAS las citas recibidas del servidor:', data.citas);
      console.log('Número total de citas:', data.citas.length);
      
      // Log detallado de cada cita
      data.citas.forEach((cita, index) => {
        console.log(`Cita ${index + 1}:`, {
          id: cita.id,
          hora: cita.hora,
          cliente: cita.usuario_nombre,
          servicio: cita.servicio_nombre,
          estado: cita.estado
        });
      });
      
      if (data.success) {
        setCitasDelDia(data.citas);
        generarHorasConEstado(data.citas);
      } else {
        console.error('Error al cargar citas del día:', data.message);
        generarHorasConEstado([]);
      }
    } catch (error) {
      console.error('Error al cargar citas del día:', error);
      generarHorasConEstado([]);
    } finally {
      setLoading(false);
    }
  };

const generarHorasConEstado = (citas) => {
  console.log('=== INICIANDO GENERACIÓN DE HORAS ===');
  console.log('Citas recibidas:', citas);
  console.log('Número de citas:', citas.length);
  
  const horasConEstado = horasDisponibles.map(hora => {
    const horaNormalizada = hora.includes(':') ? hora : hora + ':00';
    const horaSinSegundos = horaNormalizada.substring(0, 5);
    
    console.log(`--- Procesando hora: ${hora} (normalizada: ${horaSinSegundos}) ---`);
    
    const citaEnEstaHora = citas.find(cita => {
      const horaBD = cita.hora.trim();
      const horaBDSinSegundos = horaBD.substring(0, 5);
      
      console.log(`Comparando BD: "${horaBDSinSegundos}" con Front: "${horaSinSegundos}"`);
      const coincide = horaBDSinSegundos === horaSinSegundos;
      console.log(`¿Coincide? ${coincide}`);
      
      return coincide;
    });
    
    console.log(`Resultado para ${hora}: ${citaEnEstaHora ? 'OCUPADA' : 'DISPONIBLE'}`);
    
    return {
      hora: hora,
      disponible: !citaEnEstaHora,
      cita: citaEnEstaHora || null
    };
  });

  console.log('=== RESULTADO FINAL ===', horasConEstado);
  setHoras(horasConEstado);
};

  const formatearFecha = (fecha) => {
    const opciones = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  };

  const formatearHora = (hora) => {
    const [horas, minutos] = hora.split(':');
    const horaNum = parseInt(horas);
    return horaNum < 12 ? `${hora} AM` : `${horaNum === 12 ? 12 : horaNum - 12}:${minutos} PM`;
  };

  if (!isOpen || !fecha) return null;

  return (
    <div className="horas-modal-overlay">
      <div className="horas-modal-content">
        <div className="horas-modal-header">
          <h2>Horarios del Día</h2>
          <button className="horas-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="horas-content">
          <div className="horas-fecha-info">
            <h3>{formatearFecha(fecha)}</h3>
          </div>

          {/* Leyenda de estados */}
          <div className="horas-leyenda">
            <div className="leyenda-item">
              <div className="leyenda-color disponible"></div>
              <span>Hora disponible</span>
            </div>
            <div className="leyenda-item">
              <div className="leyenda-color ocupada"></div>
              <span>Hora ocupada</span>
            </div>
          </div>

          <div className="horas-lista">
            {loading ? (
              <div className="horas-loading">
                Cargando horarios...
              </div>
            ) : (
              horas.map((horaInfo, index) => (
                <div
                  key={index}
                  className={`hora-item ${horaInfo.disponible ? 'disponible' : 'ocupada'}`}
                >
                  <div className="hora-info">
                    <span className="hora-texto">{formatearHora(horaInfo.hora)}</span>
                    <span className="hora-estado">
                      {horaInfo.disponible ? 'Disponible' : 'Ocupada'}
                    </span>
                  </div>
                  
                  {!horaInfo.disponible && horaInfo.cita && (
                    <div className="hora-cita-info">
                      <div className="hora-cliente">
                        {horaInfo.cita.usuario_nombre || 'Cliente'}
                      </div>
                      <div className="hora-servicio">
                        {horaInfo.cita.servicio_nombre || 'Servicio'}
                      </div>
                      {horaInfo.cita.notas && (
                        <div className="hora-notas">
                          Notas: {horaInfo.cita.notas}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="horas-actions">
            <button 
              className="horas-cancel-btn" 
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorasDelDia;