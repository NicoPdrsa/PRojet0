// lancement serveur ///////////

var express = require('express');
var app = express();

const port = process.env.PORT || 3000;

app.get("/toto", function(req,resp){
    resp.send("salut toto!");
})


app.listen(port, function(){
    console.log('serveur listening : '+port);
})

///////////////////////////////
