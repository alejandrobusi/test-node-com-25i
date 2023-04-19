const User = require('../models/user.model');

const emailExistValidation = async (email) => {
  const searchEmail = await User.findOne({email});

  if (searchEmail) {
    throw new Error(`El email ${email}, ya se encuentra registrado.`);
  }
  return false;
};

module.exports = {
  emailExistValidation,
};
