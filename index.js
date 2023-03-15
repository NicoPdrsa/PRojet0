var express = require('express');
var app = express();

const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var data={};
var id=0;

app.use(express.static('html'));

	
app.post("/annotation", function(req, res){
	var body = req.body;
	// console.log(body);
	data[id]=body;
	// data.push(body);
	console.log(data);
	id++;
	res.send();
});


app.get("/RecupAnnotUniq", function(req, res){
    var IdAnnot = req.query.Annot;

    var Exist=false;

    var ListFound = [];

    for (key in data){
        if (key==IdAnnot){
            Exist = true;
            ListFound.push(data[key]);
        }
    }

    var ChoixFormat=req.query.FormatIdAnnot;


    if (ChoixFormat=="html"){
        req.headers['accept']= 'text/html';
    }
    else {
        if (ChoixFormat=="Json"){
            req.headers['accept']=  'application/json';
        }
    }


    res.format ({
           'text/html': function() {
                if (Exist){
                   res.send(ListFound); 
				   console.log("Document HTML");

                }
                else {
                   res.send("aucune annotation n'est associée à cette clé");
                }
           },

           'application/json': function() {
                if (Exist){
                   res.send(ListFound); 
				   console.log("Document JSON");
                }
                else {
                   res.send("aucune annotation n'est associée à cette clé");
                }
            }
    });

});




app.get("/AllAnnot", function(req, res){
	var ChoixFormat=req.query.FormatAllAnnot;
	
	
	if (ChoixFormat=="html"){
		req.headers['accept']= 'text/html';
	}
	else {
		if (ChoixFormat=="Json"){
			req.headers['accept']=  'application/json';
		}	
	}
		
	res.format ({
		   'text/html': function() {
				console.log("Document HTML");
				res.send(data); 
		   },

		   'application/json': function() {
				console.log("Document JSON");
				res.send(data);
			}
	});
	
});


app.get("/AnnotURI", function(req, res){
	var IdURI = req.query.AnnotURI;
	
	var ChoixFormat=req.query.FormatAnnotURI;
	
	var tabRep=[]
	
	for (key in data){
		if (data[key]["URI"]==IdURI){
			tabRep.push({"Clé" : key, "Commentaire" : data[key]["Commentaire"]});
		}
	}
	
	if (ChoixFormat=="html"){
		req.headers['accept']= 'text/html';
	}
	else {
		if (ChoixFormat=="Json"){
			req.headers['accept']=  'application/json';
		}	
	}
		
	res.format ({
		   'text/html': function() {
			  res.send(tabRep); 
			  console.log("Document HTML");
		   },

		   'application/json': function() {
			  res.send(tabRep);
			  console.log("Document JSON");
			}
	});
	
});





app.listen(port, function(){
	console.log('serveur listening on port : '+port);
});