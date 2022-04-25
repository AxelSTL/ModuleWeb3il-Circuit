
let http = require('http');
let fileSystem = require('fs');
let url = require('url');
let query = require('querystring')
http.createServer(function(request, response) {
let myUrl = url.parse(request.url, true);
let pageHtml = myUrl.pathname.replace('/', '');
let dataPost = [];
let dataPostStr;
/*POST */

request.on('data', function(dataChuck){
dataPost.push(dataChuck)
});

request.on('end',function(){
  dataPostStr = Buffer.concat(dataPost).toString();
  dataPostStr = query.parse(dataPostStr)
  console.log(dataPostStr)
})
  fileSystem.readFile(pageHtml, function(err, data){
      if(err){
        response.writeHead(400, {"Content-Type": "text/html"});
          response.end('Pas de fichier')
          console.log("pas de data "  + data + '    ' + myUrl.href)
      } else {
        response.writeHead(200, {"Content-Type": "text/html"});
                if(dataPostStr.nom === undefined || dataPostStr.nom === ''){

        } else {
          data = data.toString().replace('{{nom}}', dataPostStr.nom);
          data = data.toString().replace('{{prenom}}', dataPostStr.prenom);
        }
      

          response.end(data)
          console.log("Fichier trouver")
      }
  })










/*GET*/


  // fileSystem.readFile(pageHtml, function(err, data){
  //     if(err){
  //       response.writeHead(400, {"Content-Type": "text/html"});
  //         response.end('Pas de fichier')
  //         console.log("pas de data "  + data + '    ' + myUrl.href)
  //     } else {
  //       response.writeHead(200, {"Content-Type": "text/html"});
  //       let myQuery = myUrl.query;

  //       if(myQuery.nom === undefined || myQuery.nom === ''){

  //       } else {

  //         data = data.toString().replace('{{nom}}', myQuery.nom);
  //         data = data.toString().replace('{{prenom}}', myQuery.prenom);
  //       }

  //         response.end(data)
  //         console.log("Fichier trouver")
  //     }
  // })
}).listen(8080);