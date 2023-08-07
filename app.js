require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 80;
const router = express.Router()
const apiRoutes = require('./app/routes/api')(router)

app.use(express.json());

app.use('/api', apiRoutes)

app.listen(port, () => console.log(`App running on port ${port}!`));