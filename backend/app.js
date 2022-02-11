const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt');
const path = require ('path');
const bodyParser  = require('body-parser');

const sauceRoutes = require ('./routes/sauce');
const utilisateurRoutes = require ('./routes/utilisateur');


mongoose.connect('mongodb+srv://usertest:Pouetpouet1@cluster0.1f9dn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })

  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8081');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    console.log('connexion api réussie !');
    next();
  });



app.use('/images', express.static(path.join(__dirname, '/images')));


app.use ('/api/sauces',sauceRoutes);
app.use ( '/api/auth' ,utilisateurRoutes);



module.exports = app;