const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({email});
    if (!userExist) return res.status(404).json('Verifica el email o la contraseña');
    const verifyPass = bcrypt.compareSync(password, userExist.password);
    if (!verifyPass) return res.status(404).json('Verifica el email o la contraseña');

    const payload = {
      id: userExist._id,
      email: userExist.email,
      role: userExist.role,
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: 120,
    });

    res.status(200).json({ msg: 'Ingreso exitoso', token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  login,
};
