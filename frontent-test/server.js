    const express = require('express');
    const path = require('path');
    const app = express();
    app.set('port', (process.env.PORT || 4205));
    app.use(express.static(__dirname + '/dist/frontent-test'));

    app.get('/*', function(req,res) {
        res.sendFile(path.join(__dirname + '/dist/frontent-test/index.html'));
    });

    app.listen(app.get('port'), function() {
        console.log('app running on port', app.get('port'));
    });
//pm2 start --name 'Salun Admin' server.js