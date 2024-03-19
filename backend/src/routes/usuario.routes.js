import express from "express";
import Usuario from "../models/usuario.js";
import {
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarios,
} from "../controllers/usuarioController.js";

const router = express.Router();

// Peticiones GET
router.get("/", obtenerUsuarios); // Obtener todos los usuarios

//Peticiones POST
router.post("/", crearUsuario); //crear usuario

//Peticiones PUT
router.put("/:id", actualizarUsuario); // Actualizar usuario

//Peticiones DELETE
router.delete("/:id", eliminarUsuario); // Eliminar usuario


export default router;
