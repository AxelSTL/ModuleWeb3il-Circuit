const express = require('express');
const res = require('express/lib/response');
//const cors = require('cors');
const app = express();
const mysql = require('mysql');




// app.use(cors());

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'circuit3il'

});
function bddConnect() {
  connection.connect(function (err) {
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


function userSinging(){
  return new Promise((resolve, reject) => {
  let sql = "SELECT * FROM user ";
  let query = connection.query(sql, (err, result, field) => {
    if(err) throw err;
  resolve(result)
  });
});
}





function addCircuit(title, description, image){
  connection.query("insert into circuit (title,description,image) VALUES (\'" + title + "\',\'" + description + "\',\'" + image + "\')", function (err, resultat) {
    if (err) {
      connection.end;
      throw err;
    }
    else {
      connection.end;
    }
  });
}

function getCircuit(){
  return new Promise((resolve, reject) => {
  let sql = "SELECT * FROM `circuit` ";  let query = connection.query(sql, (err, result, field) => {
    if(err) throw err;
  resolve(result)
  });
});
}







module.exports = { bddConnect, userSingup, userSinging, addCircuit,getCircuit };
