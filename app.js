require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 80;
const router = express.Router()
const apiRoutes = require('./app/routes/api')(router)

const commentRouter = require('./routes/comments');
const placeRouter = require('./routes/places');
const categoryRouter = require('./routes/categories');
const favouriteRouter = require('./routes/favourites');

const dotenv = require("dotenv")
dotenv.config()

app.use(express.json());
app.use('/api/comment',commentRouter);
app.use('/api/place',placeRouter);
app.use('/api/category',categoryRouter);
app.use('/api/favourite',favouriteRouter);

app.use(express.json());

app.use('/api', apiRoutes)

app.listen(port, () => console.log(`App running on port ${port}!`));