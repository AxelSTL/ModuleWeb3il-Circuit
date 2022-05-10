

var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
const express = require('express');
const { check, validationResult } = require('express-validator')
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Page d\'acceuil' });
});

router.get('/index.html', (req, res) => {
  res.render('index', { title: 'Page d\'acceuil' });
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
  console.log(req.body)
}
);

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
        res.redirect('back');
    });
});

//Récupération des champs titre et description
let formData = new Map();
req.busboy.on('field', function(fieldname, val) {
  formData.set(fieldname, val);
});


req.busboy.on("finish", function() {
  console.log("=========================================")
  console.log(imageName)
  console.log(formData)
  console.log("=========================================")
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
