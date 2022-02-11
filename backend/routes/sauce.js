 const express = require('express');
 const router = express.Router();


 const sauceCtroller = require ('../controllers/sauce');
 const auth = require ('../middleware/auth');
 const multer = require ('../middleware/multer-config');


  router.get ('/', auth ,sauceCtroller.listeDesSauces);
  router.get ('/:id', auth ,sauceCtroller.retourSauce);
  router.post ('/', auth ,multer ,sauceCtroller.creerSauce);
  router.put ('/:id' , auth ,multer ,sauceCtroller.modifierSauce);
  router.delete ('/:id', auth  ,sauceCtroller.supprimerSauce);
  router.post ('/:id/like', auth ,sauceCtroller.likerSauce);


  module.exports = router;