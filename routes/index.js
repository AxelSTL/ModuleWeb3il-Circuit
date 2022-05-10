

var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
const express = require('express');
const { check, validationResult } = require('express-validator')
const router = express.Router();
const bdd = require('../bdd/connexionBdd');
let listCircuit;


router.get('/', (req, res) => {
  res.render('index', { title: 'Page d\'acceuil' });
});
//=============================================================//
router.get('/index.html', (req, res) => {
  res.render('index', { title: 'Page d\'acceuil' });
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
  let a = getListCircuit();
  console.log(a[0])
  res.render('allCircuit', { a: a });
});

function setListCircuit(result){
  this.listCircuit = result;
  //console.log(this.listCircuit)
}

function getListCircuit(result){
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

