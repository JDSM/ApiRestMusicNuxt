const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();

const userRoutes = require('./routes/User');
const topRoutes = require('./routes/TopMusic');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mevn-stack', {
    useMongoClient: true
}).then(() => console.log('db conected'))
.catch(err => console.log(err));

//setting
app.set('port', process.env.PORT || 3030);
//middlewres
app.use(bodyParser.json());
app.use(cors());
// routes
app.use('/user',userRoutes);
app.use('/topmusic',topRoutes);
// static file
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3030, () => {
    console.log ('server on port', app.get('port'));
});