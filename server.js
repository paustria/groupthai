import express from 'express';
import bodyParser from 'body-parser';

let app = express();

app.set('port', process.env.PORT || 3000)
    .use(express.static(__dirname + '/public'))
    .use(bodyParser.json());

app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'))
.listen(app.get('port'), () => console.log('Express server listening on port ' + app.get('port')));
