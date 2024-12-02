const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://giangtvph38936:admin123@cluster0.a4j5d.mongodb.net/ ')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const carRoutes = require('./routes/cars');
app.use('/cars', carRoutes);

// Home route
app.get('/', (req, res) => {
    res.redirect('/cars');
});

const PORT = process.env.PORT || 3000;
app.listen(5000, '0.0.0.0', () => {
    console.log('Server is running on port 5000');
});

