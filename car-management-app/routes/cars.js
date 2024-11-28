const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// Index - Show all cars
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find();
        res.render('cars/index', { cars, searchTerm: '' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// New - Show form to create new car
router.get('/new', (req, res) => {
    res.render('cars/new');
});

// Create - Add new car to DB
router.post('/', async (req, res) => {
    const car = new Car({
        MaXe: req.body.MaXe,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        year: req.body.year,
        price: req.body.price,
        description: req.body.description
    });

    try {
        const newCar = await car.save();
        res.redirect('/cars');
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).render('cars/new', { car: car, error: 'MaXe must be unique. This value already exists.' });
        } else {
            res.status(400).render('cars/new', { car: car, error: err.message });
        }
    }
});

// Show - Show info about one car
router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (car == null) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.render('cars/show', { car });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Edit - Show form to edit car
router.get('/:id/edit', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (car == null) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.render('cars/edit', { car });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update - Update a car in DB
router.put('/:id', async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.redirect(`/cars/${car._id}`);
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).render('cars/edit', { car: req.body, error: 'MaXe must be unique. This value already exists.' });
        } else {
            res.status(400).render('cars/edit', { car: req.body, error: err.message });
        }
    }
});

// Delete - Delete a car from DB
router.delete('/:id', async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.redirect('/cars');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Search - Search for cars
router.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.term;
        const cars = await Car.find({
            $or: [
                { MaXe: { $regex: searchTerm, $options: 'i' } },
                { name: { $regex: searchTerm, $options: 'i' } },
                { manufacturer: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ]
        });
        res.render('cars/index', { cars, searchTerm });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

