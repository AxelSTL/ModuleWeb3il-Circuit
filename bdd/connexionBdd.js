const express = require('express');
const res = require('express/lib/response');
//const cors = require('cors');
const app = express();
const mysql = require('mysql');

const path = require('path');
let sessions = require('express-session'); 

let session;
const twoHours = 1000 * 60 * 60 * 2;



// app.use(cors());

var connection = mysql.createConnection({
    host  : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'circuit3il'

});
function bddConnect (){
    connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
      
        console.log('connected as id ' + connection.threadId);
      });

}


function userSingup (nom,prenom,mdp,mail ){
  connection.query("insert into user (nom,prenom,mdp,mail) VALUES (\'" + nom + "\',\'" + prenom + "\',\'" + mdp + "\',\'" + mail + "\')", function (err, resultat){
    if (err){
      connection.end;
      throw err;
    }
    else{
      console.log(resultat);
      connection.end;
    }
  });

}

// function userSinging(){
//   return new Promise((resolve, reject) => {
//   let sql = "SELECT * FROM user ";
//   let query = connection.query(sql, (err, result, field) => {
//     if(err) throw err;
//   resolve(result)
//   });
// });
// }


let middleWare = function (req, res, next) {
    console.log("MiddleWare");
      let mail=req.body.mail.toString();
      let mdp=req.body.mdp.toString();
      //userSinging(mail,mdp);

      let sqlReq = "SELECT * FROM user WHERE mail='"+ mail +"' AND mdp='" + mdp + "'";
      console.log(sqlReq);
      connection.query(sqlReq, function (err,result){ 
        console.log('***index.html***');
        
        console.log('Session : ' + req.body.mail);
        if (result.length > 0){
          this.session = req.session;
          this.session.mail = req.body.mail
          console.log('Session : ' + req.body.mail);
          let envoie = path.join(__dirname + '/..' + '/views/index.html');
        
          //console.log(result.length);
          //res.sendFile(envoie);
          res.render('userislogin', { title: 'Page d\'acceuil' });
        }else {
          res.render('connexion', { result: "C'est null" });
        }
      });
      next();
};



function getSession(){
  return this.session;
}




module.exports={bddConnect,userSingup,middleWare,getSession};

