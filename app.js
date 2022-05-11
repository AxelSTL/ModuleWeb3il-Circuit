// let http = require('http')
// let server =  http.createServer()
// const Event = require('events')
// let url = require('url');
// let fileSystem = require('fs');


// let App = {
//     start: function(port){
//         let myEvent = new Event();
//         server.on('request', function(req, resp) {
//             resp.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
//             if(req.url === '/' || http.request.url === 'index.html'){
//                 myEvent.emit('root', resp)
//             }
//         });
//         server.listen(port)
//         return myEvent;
//     },

//     get: function(request, response, pageHtml){
//         fileSystem.readFile(pageHtml, function(err, data){
//             if(!err){
//             response.end(data)
//             }
//         });
//     }
// }

// let myApp = App.start(8080)

// myApp.on('root', function(resp){
//     server.on('request', function(request, response){
//         let myUrl = url.parse(request.url, true);
//         let pageHtml = myUrl.pathname.replace('/', '');
//         if(myUrl.pathname === '' || myUrl.pathname === '/'){
//             pageHtml = 'index.html'
//         }

//         App.get(request, response, pageHtml)

//     })
// })

const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
var busboy = require('connect-busboy'); //middleware for form/file upload

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

// app.use('/images', express.static(__dirname + '/images'));

app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "images")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(busboy());
app.use('/', routes);
module.exports = app;
