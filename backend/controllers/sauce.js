const Sauce= require ('../models/sauce');
const fs = require('fs');


exports.listeDesSauces = (req, res, next) => {
    Sauce.find ()
        .then (listeSauce => res.status(200).json(listeSauce))
        .catch (error => res.status(400).json({ error }));
  };

exports.retourSauce =(req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
  };

exports.creerSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    
    const sauce = new Sauce({
    userId: sauceObject.userId,
    name: sauceObject.name,
    manufacturer: sauceObject.manufacturer,
    description: sauceObject.description,
    mainPepper: sauceObject.mainPepper,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    heat: sauceObject.heat,
    likes:0, 
    dislikes:0, 
    usersLiked:[], 
    usersDisliked:[] 
      });
      sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
        .catch(error => res.status(400).json({ error }));
  };

exports.modifierSauce = (req, res, next) => {
  if (req.file){
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split ('/images/')[1];
      fs.unlink (`images/${filename}`, ()=>{});
    })
    .catch(error => res.status(500).json({ error }));
  };
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne ({_id: req.params.id }, {...sauceObject , _id: req.params.id})
    .then (() => res.status(200).json({ message : 'Sauce modifié'}))
    .catch (error => res.status(400).json({ error }));
  };

exports.supprimerSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split ('/images/')[1];
      fs.unlink (`images/${filename}`, ()=>{
        Sauce.deleteOne ({_id: req.params.id })
          .then (() => res.status(200).json({message : 'Sauce supprimé'}))
          .catch (error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
  };





exports.likerSauce = (req, res, next) => {

  let sauceObject ;
  const userLike = req.body.like;
  const utilisateurId = req.body.userId;

  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
    sauceObject = sauce;
    
    if (userLike == 1 ){
      sauceObject.usersLiked.push (utilisateurId);
      sauceObject.likes = sauceObject.likes + 1 ;
    } ;

    if (userLike == -1){
      sauceObject.usersDisliked.push (utilisateurId);
      sauceObject.dislikes = sauceObject.dislikes + 1 ;
    } ;

    if (userLike == 0){
      for ( let i = 0 ; i < sauceObject.usersLiked.length ; i++ ) {
        if (utilisateurId == sauceObject.usersLiked[i] ){
          sauceObject.usersLiked.splice(i, 1);
          sauceObject.likes = sauceObject.likes - 1 ;
        };
      };
      for ( let i = 0 ; i < sauceObject.usersDisliked.length ; i++ ) {
        if (utilisateurId == sauceObject.usersDisliked[i] ){
          sauceObject.usersDisliked.splice(i, 1);
          sauceObject.dislikes = sauceObject.dislikes - 1 ;
        };
      };
    };
    
    Sauce.updateOne ({_id: req.params.id }, {
      likes:sauceObject.likes, 
      dislikes:sauceObject.dislikes, 
      usersLiked:sauceObject.usersLiked, 
      usersDisliked:sauceObject.usersDisliked, 
       _id: req.params.id})
      .then (() => res.status(200).json({ message : 'Sauce liké'}))
      .catch (error => res.status(400).json({ error }));

  })
  .catch(error => res.status(500).json({ error }));
  };
