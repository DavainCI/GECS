const db = require('../config/database');

const citasController = {
    // Obtener citas por mes
    getCitasByMonth: (req, res) => {
        try {
            const { year, month } = req.query;
            
            if (!year || !month) {
                return res.status(400).json({
                    success: false,
                    message: 'Se requieren los parámetros year y month'
                });
            }

            const query = `
                SELECT c.*, s.nombre as servicio_nombre, u.nombre as cliente_nombre 
                FROM citas c 
                JOIN servicios s ON c.servicio_id = s.id 
                JOIN usuarios u ON c.usuario_id = u.id 
                WHERE YEAR(c.fecha) = ? AND MONTH(c.fecha) = ? 
                ORDER BY c.fecha, c.hora
            `;
            
            db.query(query, [parseInt(year), parseInt(month)], (err, results) => {
                if (err) {
                    console.error('Error al obtener citas:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Error al cargar las citas'
                    });
                }
                
                res.json({
                    success: true,
                    citas: results
                });
            });
            
        } catch (error) {
            console.error('Error al obtener citas:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    },

getCitasByDay: (req, res) => {
  try {
    const { fecha } = req.query;
    
    if (!fecha) {
      return res.status(400).json({
        success: false,
        message: 'Se requiere el parámetro fecha'
      });
    }

    console.log('Buscando TODAS las citas para la fecha:', fecha);

    // TEMPORAL: Quitar filtro de estados para debugging
    const query = `
      SELECT c.*, s.nombre as servicio_nombre, u.nombre as usuario_nombre 
      FROM citas c 
      JOIN servicios s ON c.servicio_id = s.id 
      JOIN usuarios u ON c.usuario_id = u.id 
      WHERE c.fecha = ?
      ORDER BY c.hora
    `;
    
    db.query(query, [fecha], (err, results) => {
      if (err) {
        console.error('Error al obtener citas del día:', err);
        return res.status(500).json({
          success: false,
          message: 'Error al cargar las citas del día'
        });
      }
      
      console.log('TOTAL de citas encontradas en BD:', results.length);
      console.log('Detalle de citas:', results);
      
      res.json({
        success: true,
        citas: results
      });
    });
    
  } catch (error) {
    console.error('Error al obtener citas del día:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }

},
    // Crear nueva cita
    createCita: (req, res) => {
        try {
            const { usuario_id, servicio_id, fecha, hora, notas } = req.body;

            console.log('Datos recibidos para crear cita:', req.body);

            // Validaciones básicas
            if (!usuario_id || !servicio_id || !fecha || !hora) {
                return res.status(400).json({
                    success: false,
                    message: 'Faltan campos obligatorios: usuario_id, servicio_id, fecha, hora'
                });
            }

            // Verificar si la hora está disponible
            const checkQuery = `
                SELECT id FROM citas 
                WHERE fecha = ? AND hora = ? AND estado IN ('pendiente', 'confirmada')
            `;
            
            db.query(checkQuery, [fecha, hora], (err, existingCitas) => {
                if (err) {
                    console.error('Error al verificar disponibilidad:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Error al verificar disponibilidad'
                    });
                }
                
                if (existingCitas.length > 0) {
                    return res.status(400).json({
                        success: false,
                        message: 'La hora seleccionada no está disponible'
                    });
                }

                // Insertar nueva cita
                const insertQuery = `
                    INSERT INTO citas (usuario_id, servicio_id, fecha, hora, notas, estado) 
                    VALUES (?, ?, ?, ?, ?, 'pendiente')
                `;
                
                db.query(insertQuery, [
                    usuario_id, 
                    servicio_id, 
                    fecha, 
                    hora, 
                    notas || ''
                ], (err, result) => {
                    if (err) {
                        console.error('Error al crear cita:', err);
                        return res.status(500).json({
                            success: false,
                            message: 'Error al crear la cita'
                        });
                    }

                    res.json({
                        success: true,
                        message: 'Cita creada exitosamente',
                        citaId: result.insertId
                    });
                });
            });

        } catch (error) {
            console.error('Error al crear cita:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    },

    // Obtener citas del usuario actual
    getMisCitas: (req, res) => {
        try {
            const { usuario_id } = req.query;

            if (!usuario_id) {
                return res.status(400).json({
                    success: false,
                    message: 'Se requiere el ID del usuario'
                });
            }

            const query = `
                SELECT c.*, s.nombre as servicio_nombre, s.duracion_minutos, s.precio_minimo, s.precio_maximo
                FROM citas c 
                JOIN servicios s ON c.servicio_id = s.id 
                WHERE c.usuario_id = ? 
                ORDER BY c.fecha DESC, c.hora DESC
            `;
            
            db.query(query, [parseInt(usuario_id)], (err, results) => {
                if (err) {
                    console.error('Error al obtener citas del usuario:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Error al cargar las citas'
                    });
                }
                
                res.json({
                    success: true,
                    citas: results
                });
            });

        } catch (error) {
            console.error('Error al obtener citas del usuario:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    },

    // Obtener todos los servicios
    getServicios: (req, res) => {
        try {
            const query = `
                SELECT * FROM servicios 
                WHERE activo = 1 
                ORDER BY nombre
            `;
            
            db.query(query, (err, results) => {
                if (err) {
                    console.error('Error al obtener servicios:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Error al cargar servicios'
                    });
                }
                
                res.json({
                    success: true,
                    servicios: results
                });
            });

        } catch (error) {
            console.error('Error al obtener servicios:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
};

module.exports = citasController;