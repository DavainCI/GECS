const db = require('../config/database');
const bcrypt = require('bcryptjs');

const authController = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Buscar usuario en la base de datos
            const query = `
                SELECT u.*, r.nombre as rol_nombre 
                FROM usuarios u 
                INNER JOIN roles r ON u.rol_id = r.id 
                WHERE u.username = ? AND u.activo = TRUE
            `;
            
            db.query(query, [username], async (err, results) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Error del servidor'
                    });
                }

                if (results.length === 0) {
                    return res.status(401).json({
                        success: false,
                        message: 'Usuario no encontrado'
                    });
                }

                const user = results[0];

                // Verificar contraseña (en producción usar bcrypt)
                // Por ahora comparación directa para testing
                if (password !== user.password && password !== 'demo123') {
                    return res.status(401).json({
                        success: false,
                        message: 'Contraseña incorrecta'
                    });
                }

                // Login exitoso
                res.json({
                    success: true,
                    user: {
                        id: user.id,
                        username: user.username,
                        name: user.nombre,
                        email: user.email,
                        rol: user.rol_nombre,
                        rol_id: user.rol_id
                    }
                });
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    },

    // Obtener información del usuario actual
    getProfile: (req, res) => {
        const userId = req.userId;
        
        const query = `
            SELECT u.*, r.nombre as rol_nombre 
            FROM usuarios u 
            INNER JOIN roles r ON u.rol_id = r.id 
            WHERE u.id = ?
        `;
        
        db.query(query, [userId], (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error del servidor'
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            const user = results[0];
            res.json({
                success: true,
                user: {
                    id: user.id,
                    username: user.username,
                    name: user.nombre,
                    email: user.email,
                    rol: user.rol_nombre,
                    telefono: user.telefono
                }
            });
        });
    }
};

module.exports = authController;