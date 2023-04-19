const { obtenerTodosLosUsuarios, obtenerUsuarioPorId, crearUsuario, editarUsuario, eliminarUsuario } = require('../services/user.service');
const { validationResult } = require('express-validator');
const bcrypt =  require('bcrypt');

const getAllUsers = async(req, res) => {
  try {
    const resp = await obtenerTodosLosUsuarios();
    if (resp.length === 0) {
      return res.status(404).json('No hay usuarios en la base de datos.');
    }
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserById = async(req, res) => {
  try {
    const { id } = req.params;
    const resp = await obtenerUsuarioPorId(id);
    if (!resp) {
      return res.status(404).json('Usuario no encontrado.');
    }
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createUser = async(req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors : errors.array() });
    }
    const saltRound = bcrypt.genSaltSync(10);
    const userData = req.body;
    userData.password = bcrypt.hashSync(userData.password, saltRound);
    const resp = await crearUsuario(userData);
    res.status(201).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const editUser = async(req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const resp = await editarUsuario(id, userData);
    if (!resp) {
      return res.status(404).json('Usuario no encontrado.');
    }
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const disabledUser = async (req, res) => {
  try {
    const { id } = req.params;
    const disabled = true;
    const resp = await editarUsuario(id, {disabled});
    if (!resp) {
      return res.status(404).json('Usuario no encontrado.');
    }
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteUser = async(req, res) => {
  try {
    const { id } = req.params;
    const resp = await eliminarUsuario(id)
    if (!resp) {
      return res.status(404).json('Usuario no encontrado.');
    }
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
  disabledUser
};
