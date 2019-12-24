let express = require('express');
let stateRoute = require('./routes/state');
let districtRoute = require('./routes/district');
let townRoute = require('./routes/town');

let app = express();

let Helper = require('./util/Helper');
let mongoDbHelper = require('./util/MongoDBHelper');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoDbHelper.connect().then(() => {
    app.use('/state', stateRoute);
    app.use('/district', districtRoute);
    app.use('/town', townRoute);

    app.listen(8080);

    Helper.log('app listening http://localhost:8080');
});