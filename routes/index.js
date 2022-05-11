

var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bdd = require('../bdd/connexionBdd');
let listUser;
let sessions = require('express-session'); 

const twoHours = 1000 * 60 * 60 * 2;






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
  let result = "";
  res.render('connexion', { result: '' });
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

  const test = bdd.userSinging(req.body.nom , req.body.prenom , req.body.mdp , req.body.mail);
  console.log(test);

});



// router.post('/usersinging', async (req, res)  => {
//   await bdd.userSinging().then(  function(result){
//     setUserList(result);
//   })
//   let a = getUserList();
//   console.log(a[0])
// });

// function setUserList(result){
//   this.listUser = result;
//   //console.log(this.listCircuit)
// }

// function getUserList(result){
//   return this.listUser;
// }

//session middleware
router.use(sessions({
  secret: "secretkeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge: twoHours },
  resave: false
 }));

 router.use(express.urlencoded({ extended: true }));


 router.get('/logout',function(req,res){
  let session = bdd.getSession();
  console.log(session)
  req.session.destroy();

  res.render('index', { title: 'Tout les circuits' });
  
});


router.post('/usersinging',bdd.middleWare, function(req,res){
      console.log('coucou');
      
 });
 

 router.get('/userislogin', (req, res) => {
  console.log('-yuyjjyuyèi_è__ii_');
  
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
