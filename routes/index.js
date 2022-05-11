

var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bdd = require('../bdd/connexionBdd');
const { stringify } = require('querystring');
let listCircuit;
let user;
let session = "";


router.get('/', (req, res) => {
  res.render('index', { session: this.session });
  // res.send('../common/header', {session : this.session});
});

router.get('/index', (req, res) => {
  res.render('index', { session: this.session });
  // res.send('../common/header', {session : this.session});

});

router.get('/inscription', (req, res) => {
  res.render('inscription', { title: 'inscription', session: this.session  });
  // res.send('../common/header', {session : this.session});
});

router.get('/connexion', (req, res) => {
  res.render('connexion', { errorsMessage: '', session: this.session });
  //res.send('../common/header', {session : this.session});
});
//=============================================================//
router.get('/inscription', (req, res) => {
  res.render('inscription', { title: 'inscription', session: this.session });
});

//=============================================================//
router.post('/usersingup', (req, res) => {

bdd.userSingup(req.body.nom, req.body.prenom, req.body.mdp, req.body.mail);
res.render('index', { session: this.session });
});

//=============================================================//

router.post('/usersinging', async (req, res) => {
  await bdd.userSinging().then( function(result){
    setUser(result);
  })
  let user = getsetUser();
  let userconnected = null;
  for(let i =0; i < user.length; i++){
    if(user[i].mail == req.body.mail){
      if(user[i].mdp == req.body.mdp){
        userconnected = user[i];
        this.session = userconnected.nom;
        
      }
    }
  }
  console.log(userconnected)
  if(userconnected){
    res.render('index', { session : this.session });
  } else{
    res.render('connexion', { errorsMessage : 'Compte inconnu, veuillez vous inscrire', session : this.session });
  }
});

function setUser(result){
  this.user = result;
}

function getsetUser(){
  return this.user;
}


router.get('/logout', (req, res) => {
  this.session = '';
  res.render('index', { session: this.session });
});



//=============================================================//
router.get('/allcircuit', async (req, res)  => {
  await bdd.getCircuit().then( function(result){
    setListCircuit(result);
  })
  let circuits = getListCircuit();
  res.render('allCircuit', { circuits: JSON.stringify(circuits), session: this.session });
});

function setListCircuit(result){
  this.listCircuit = result;
  //console.log(this.listCircuit)
}

function getListCircuit(){
  return this.listCircuit;
}

//=============================================================//
router.get('/addcircuit', (req, res) => {
  res.render('addcircuit', { title: 'Ajouter des circuits', session: this.session });
});

//=============================================================//
router.post('/savecircuit', (req, res, next) => {
  var fstream;
  let fileData = null;
  let imageName;
  req.pipe(req.busboy);

  //Recupération de l'image et sauvegarde de celle-ci
  req.busboy.on('file', function (fieldname, file, filename) {
    console.log("Uploading: " + filename.filename);
    let newpath = __dirname.replace('routes', '')
    fstream = fs.createWriteStream(newpath + '/images/' + filename.filename);
    file.pipe(fstream);
    imageName = filename.filename;
    fstream.on('close', function () {
      console.log("Upload Finished of " + filename.filename);
    });
  });

  //Récupération des champs titre et description
  let formData = new Map();
  req.busboy.on('field', function (fieldname, val) {
    formData.set(fieldname, val);
  });


  req.busboy.on("finish", function () {
    bdd.addCircuit(formData.get('title'), formData.get('description'), imageName)
    res.render('index', { session: this.session});
  });

});
module.exports = router;

