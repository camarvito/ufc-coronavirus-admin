const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Necessário preencher o nome do local!'],
        trim: true,
    },
    street: {
        type: String,
        required: [true, 'Necessário preencher a rua do local!'],
    },
    city: {
        type: String,
        required: [true, 'Necessário preencher a cidade do local!'],
    },
    uf: {
        type: String,
        required: [true, 'Necessário preencher o estado do local!'],
    },
    imageUrl: {
        type: String,
        default: 'default-place-thumb.jpg',
    },
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
