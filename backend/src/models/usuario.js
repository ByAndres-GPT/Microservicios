import Sequelize from 'sequelize';
import sequelize from '../database/db.js';

// modelo usuario
const Usuario = sequelize.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: Sequelize.STRING,
    },
    apellido: {
        type: Sequelize.STRING,
    },
    correo: {
        type: Sequelize.STRING,
        unique: true,
    }
});
export default Usuario;