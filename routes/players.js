var mongoose = require('mongoose');
var schema = mongoose.Schema;
var playerSchema = new schema({ 
        name: String,
        year: String,
        grapes: String,
        country: String,
        region: String,
        description: String,
        picture: String 
    });

var player = mongoose.model('player', playerSchema);




exports.init = () => {
    mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/players',
   { server : { w : 1} });
  db = mongoose.connection;
};

exports.cleanup = (callback) => {
  db.close((err) => {
  });
};


exports.addplayer = (req, res) => {
    var playerToAdd = new player(req.body);
    playerToAdd.save((err, data, numAffected) => {
    if(err){
       res.send(err);
    }
    if (data !== undefined) {
      data = data.toJSON();
    }
    res.send(data);
  });
};


exports.findById = function(req, res) {
player.findOne({'_id': req.params.id}, (err, player) => {
    if (err) {
      res.send("some error");
    }
    if (player) {
      res.send(player);
    }
  });
};

exports.findAll = function(req, res) {
player.find({}, (err, player) => {
    if (err) {
      res.send("some error");
    }
    if (player) {
      res.send(player);
    }
  });
};

exports.updateplayer = function(req, res) {
    var player = req.body;
    player.findOne({'_id': req.params.id}, (err, player) => {
    if (err) {
      res.send("some error");
    }
    if (player) {
      req.body._id = req.params.id;
      playerToAdd.save((err, data, numAffected) => {
       if (err) {
         return;
       }
       if (data !== undefined) {
          data = data.toJSON();
        }
         res.send(data);
      });
    }
  });
}

exports.deleteplayer = function(req, res) {
    mongoose.model('player', playerSchema).remove({'_id': req.params.id} , (err, data) => {
    if (err) {
      res.send("some error");
    }
    if (data) {
      res.send(data);
    }
 });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var player1 = 
    {
        "name": "CHATEAU DE SAINT COSME",
        "year": "2009",
        "grapes": "Grenache / Syrah",
        "country": "France",
        "region": "Southern Rhone",
        "description": "The aromas of fruit and spice...",
        "picture": "saint_cosme.jpg"
    };

    addplayer(player1);

};