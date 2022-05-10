const express = require('express');
//const cors = require('cors');
const app = express();
const mysql = require('mysql');


export let users;

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

 function userSinging (mail,mdp) {
 
  connection.query("SELECT * FROM `user` ", function (err,result){ 
    
      if (err) {
        connection.end();
        throw err;
      }
      // console.log(result);
      connection.end();
      let user
      result.forEach(element => {

         user = {
          login: element.mail,
          pwd: element.mdp
        }
        
     
       
      });
   
      users=user;
       console.log(users);
  });

 
}




module.exports={bddConnect,userSingup,userSinging,users};
