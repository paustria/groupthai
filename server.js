import express from 'express';
import bcrypt from 'bcryptjs';
import genSalt from './app/utils/salt';
import bodyParser from 'body-parser';

const app = express();
const salt = bcrypt.genSaltSync(10);

app.set('port', process.env.PORT || 3000)
    .use(express.static(__dirname + '/public'))
    .use(bodyParser.json());

// Initialize
const username = 'phily';
const usernameSalt = genSalt(username);

const password = bcrypt.hashSync('password123', usernameSalt);
const users = {
    [username]: bcrypt.hashSync(password, salt)
};

const doesUserExist = (user) => {
    // TODO: check in DB.
    if (users[user]) return true;
    return false;
};

app.post('/login', function(req, res) {
    const account = req.body;

    if (doesUserExist && bcrypt.compareSync(account.password, users[username])) {
        console.log('Successfully login.');
        return res.status(200).json({authenticated: true, token: 'thisIsToken'});
    }

    console.log('Failed login.');
    return res.status(400).json({error: 'Failed login.'});
})
.get('*', (req, res) => {
    return res.sendFile(__dirname + '/public/index.html');
})
.listen(app.get('port'), () => console.log('Express server listening on port ' + app.get('port')));
