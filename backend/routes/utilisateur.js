const express = require ('express');
const router = express.Router ();
const utilisateurController = require ('../controllers/utilisateur');

router.post ('/signup', utilisateurController.signup);
router.post ('/login', utilisateurController.login);




module.exports = router;