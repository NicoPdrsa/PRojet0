// lancement serveur ///////////

var express = require('express');
var app = express();

const port = process.env.PORT || 3000;

//app.get("/toto", function(req,resp){
  //  resp.send("salut toto!");
//})

app.post('/annotation', (req, res) => {
    const uri = req.body.uri;
    const annotation = req.body.annotation;
    console.log(`URI: ${uri}`);
    console.log(`Annotation: ${annotation}`);
    res.send(`URI: ${uri}<br>Annotation: ${annotation}`);
});
// un post. pour creer un annotation sur une URI
// un get. qui renvoie une annotation
// un get. qui renvoie toutes les annotations
// un get. qui renvoie toutes les annotations pour une URI

// plus un code client avec html et js qui va appeler(POST) le code serveur et get annotations URI

app.listen(port, function(){
    console.log('serveur listening : '+port);
})

///////////////////////////////
