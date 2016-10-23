var express = require('express'),
    player = require('./routes/players');
    wines = require('./routes/wines');
    var bodyParser = require('body-parser');

var app = express();
player.init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/players', player.findAll);
app.get('/players/:id', player.findById);
app.post('/players', player.addplayer);
app.put('/players/:id', player.updateplayer);
app.delete('/players/:id', player.deleteplayer);
app.get('/wines', wines.findAll);
app.get('/wines/:id', wines.findById);

app.listen(3000);
console.log('Listening on port 3000...');