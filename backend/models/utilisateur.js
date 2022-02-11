const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const utilisateurShema = mongoose.Schema ({
    
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
  } );

  utilisateurShema.plugin(uniqueValidator);

  module.exports = mongoose.model('utilisateur', utilisateurShema);