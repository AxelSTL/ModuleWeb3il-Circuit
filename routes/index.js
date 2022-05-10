

var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bdd = require('../bdd/connexionBdd');
let sessions = require('express-session');


router.get('/', (req, res) => {
  res.render('index', { title: 'Page d\'acceuil' });
});

router.get('/index.html', (req, res) => {
  res.render('index', { title: 'Page d\'acceuil' });
});

router.get('/inscription', (req, res) => {
  res.render('inscription', { title: 'inscription' });
});

router.get('/connexion', (req, res) => {
  res.render('connexion', { title: 'connexion' });
});

router.post('/test',
[
  check('nom')
    .isLength({ min: 3 })
    .withMessage('Please enter a name'),
  check('prenom')
    .isLength({ min: 3 })
    .withMessage('Please enter an email'),
],

(req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
 //   res.send('Thank you for your registration!');
    res.render('index2', { title: 'Page d\'acceuil' });
  } else {
    res.render('index', {
      title: 'Registration form',
      errors: errors.array(),
      data: req.body,
    });
  }
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  //console.log(req.body)
}
);

router.post('/usersingup', (req, res) => {

  bdd.userSingup(req.body.nom , req.body.prenom , req.body.mdp , req.body.mail);

});

// router.post('/usersinging', (req, res) => {

//   let isSinging = bdd.userSinging(req.body.mail, req.body.mdp);
  
//   console.log(isSinging)
 
//   if (isSinging){
//     res.render('index', { title: 'Page d\'acceuil' });
 
//   }
//   else{
//     res.render('connexion', { title: 'Page d\'acceuil' });
//   }

// });

// router.use(sessions({
//   secret: "secretkeyfhrgfgrfrty84fwir767",
//   saveUninitialized:true,
//   cookie: { maxAge: twoHours },
//   resave: false
//  }));

let session;

router.post('/usersinging',function(req,res){
   bdd.userSinging(req.body.mail, req.body.mdp);
   user=bdd.users;
  console.log(user);
  // console.log('***user.html***');
  // console.log('login : ' + req.body.mail);
  // console.log('password : ' + req.body.mdp);
  if(req.body.mail == user.login && req.body.mdp == user.pwd){
    session = req.session; // middleware express_session
    session.userid = req.body.login; // middleware body-parser
    console.log(req.session) ;
    console.log(session.userid) ;
  }
  else{
    res.send('Login et mode passe incorrects');
  } 
 });
 

router.get('/allCircuit', (req, res) => {
  res.render('allCircuit', { title: 'Tout les circuits' });
});


router.get('/addcircuit', (req, res) => {
  res.render('addcircuit', { title: 'Ajouter des circuits' });
});


router.post('/savecircuit',(req, res, next) => {
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
req.busboy.on('field', function(fieldname, val) {
  formData.set(fieldname, val);
});


req.busboy.on("finish", function() {
  console.log(imageName)
  console.log(formData)
  res.render('index', { title: 'Acceuil' });
});


// req.busboy.on('finish', function() {
//   res.render('index', { title: 'Acceuil' });
// });

});
module.exports = router;





  //let read = fs.createReadStream(__dirname + myFileSrc);

//   let read = fileSystem.createWriteStream(req.body.image_uploads);

//    read.on('finish', function(){
//      console.log('Fichier Copié !');
//  });

//   if (errors.isEmpty()) {
//  //   res.send('Thank you for your registration!');
//     res.render('index2', { title: 'Page d\'acceuil' });
//   } else {
//     res.render('index', {
//       title: 'Registration form',
//       errors: errors.array(),
//       data: req.body,
//     });
//   }
  // const nom = req.body.nom;
  // const prenom = req.body.prenom;
  // console.log(req.files)
  // console.log(req.body)
//  });
