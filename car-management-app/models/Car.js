const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    MaXe: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Car', carSchema);

