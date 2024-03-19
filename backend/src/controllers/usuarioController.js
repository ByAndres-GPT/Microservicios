import Usuario from "../models/usuario.js";

//Crear Usuario
export const crearUsuario = async (req, res) => {
  try {
    //json body
    const { 
        nombre,
        apellido,
        correo
    } = req.body;
    //verificar si existe el email
    const existeEmail = await Usuario.findOne({ where: { correo } });
    if (existeEmail) {
      return res.status(400).json({
        error: true,
        msg: "Correo existente",
      });
    }
    //registrar usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      correo
    });
    res.status(201).json({
      error: false,
      nuevoUsuario: nuevoUsuario.nombre,
      msg: "Usuario Creado",
    });
  } catch {
    console.log(error);
    res.status(500).json({
      msg: "No se puedo crear el usuario",
      error,
    });
  }
};

// Actualizar Usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del usuario a actualizar
    const {
      nombre,
      apellido,
      correo
    } = req.body; // Obtener los datos a actualizar

    // Verificar que el usuario exista
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({
        error: true,
        msg: 'Usuario no encontrado'
      });
    }

    // Actualizar el usuario
    await usuario.update({
        nombre,
        apellido,
        correo
    });

    res.status(200).json({
      error: false,
      msg: 'Usuario actualizado exitosamente'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: 'Error al actualizar usuario'
    });
  }
};

// Eliminar
export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del usuario a eliminar
    //console.log("ID del usuario a eliminar:", ID_USUARIO);

    // Verificar que exista el usuario
    const usuario = await Usuario.findByPk(id); 
    if (!usuario) {
      return res.status(404).json({
        error: true,
        msg: 'Usuario no encontrado'
      });
    }

    await usuario.destroy(); // Eliminar el usuario

    res.status(200).json({
      error: false,
      msg: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: 'Error al eliminar usuario'
    });
  }
};

// Ver todos los usuarios registrados
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll(); // Obtener todos los usuarios

    res.status(200).json({
      error: false,
      usuarios
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: 'Error al obtener usuarios'
    });
  }
};