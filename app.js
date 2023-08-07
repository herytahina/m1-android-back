require('dotenv').config();
const express = require('express');
const app = express();

const commentRouter = require('./routes/comments');
const placeRouter = require('./routes/places');
const categoryRouter = require('./routes/categories');
const favouriteRouter = require('./routes/favourites');

const dotenv = require("dotenv")
dotenv.config()

const port = process.env.PORT;

app.use(express.json());
app.use('/comment',commentRouter);
app.use('/place',placeRouter);
app.use('/category',categoryRouter);
app.use('/favourite',favouriteRouter);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`App running on port ${port}!`));