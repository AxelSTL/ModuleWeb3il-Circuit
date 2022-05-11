

var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bdd = require('../bdd/connexionBdd');
const { stringify } = require('querystring');
let listCircuit;


router.get('/', (req, res) => {
  //console.log(this.session);
  //let varTemp = testSession();
  res.render('index', { session: this.session });

  //res.send('../common/header', {session: varTemp});
});

router.get('/index', (req, res) => {
 
  console.log(this.session);
  //let varTemp = testSession();
  //console.log(session.nom);
  res.render('index', { session: this.session });

});

router.get('/inscription', (req, res) => {
  res.render('inscription', { title: 'inscription' });
});

router.get('/connexion', (req, res) => {
  let errorsMessage = "";
  res.render('connexion', { errorsMessage: '' });
});
//=============================================================//
router.get('/inscription', (req, res) => {
  res.render('inscription', { title: 'inscription' });
});
//=============================================================//
router.get('/connexion', (req, res) => {
  res.render('connexion', { title: 'connexion' });
});
//=============================================================//
router.post('/usersingup', (req, res) => {

  let test = bdd.userSingup(req.body.nom, req.body.prenom, req.body.mdp, req.body.mail);
  console.log(test.sql)

});

//=============================================================//

router.post('/usersinging', (req, res) => {
 const test = bdd.userSinging(req.body.mail, req.body.mdp);
  console.log(test);
});


//=============================================================//
router.get('/allcircuit', async (req, res)  => {
  await bdd.getCircuit().then( function(result){
    setListCircuit(result);
  })
  let circuits = getListCircuit();
  res.render('allCircuit', { circuits: JSON.stringify(circuits) });
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
  res.render('addcircuit', { title: 'Ajouter des circuits' });
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
    console.log(imageName)
    console.log(formData.get('title'))
    res.render('index', { title: 'Acceuil' });
  });

});
module.exports = router;

