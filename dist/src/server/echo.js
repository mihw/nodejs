import express from 'express';
import bodyParser from 'body-parser';
const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.get('/users', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    console.log('req.query:', req.query);
    console.log('req.headers:', req.headers);
    const users = [
        { name: 'Yohei' },
        { name: 'Sasuke' }
    ];
    res.json(users);
});
app.post('/users', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    const { firstName, lastName } = req.body;
    res.send(`${firstName} ${lastName}`);
});
app.get('/error', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.status(400).send('Bad Request');
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Express server is listening to ${PORT}.`);
});
//# sourceMappingURL=echo.js.map