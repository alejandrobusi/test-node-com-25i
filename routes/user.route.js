const { Router } = require('express');
const { body } = require('express-validator');
const { getAllUsers, getUserById, createUser, editUser, deleteUser, disabledUser } = require('../controllers/user.controller');
const { emailExistValidation } = require('../helpers/validations');
const { jwtValidator } = require('../middlewares/jwtValidation');
const route = Router();

route.get('/get-users', jwtValidator, getAllUsers);

route.get('/get-user-by-id/:id', getUserById);

route.post(
  '/create-user', 
  body('email').not().isEmpty().withMessage('El campo email esta vacio').isEmail().withMessage('El dato ingresado no es un email valido').custom(emailExistValidation),
  body('password').matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/).withMessage('La contraseña no cumple con los requisitos'),
  createUser);

route.patch('/edit-user/:id', editUser);

route.patch('/disabled-user/:id', disabledUser)

route.delete('/delete-user/:id', deleteUser);

module.exports = route;
