const Place = require('../models/placeModel');

exports.getAllPlaces = async (req, res, next) => {
    const places = await Place.find();

    res.status(200).json({
        status: 'success',
        results: places.length,
        places: places,
    });
};

exports.createPlace = async (req, res, next) => {
    const place = await Place.create({
        name: req.body.name,
        street: req.body.street,
        uf: req.body.uf,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
    });

    res.status(201).json({
        status: 'success',
        data: {
            place: place,
        },
    });
};

exports.updatePlace = async (req, res, next) => {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!place) return new Error('Local não encontrado!');

    res.status(200).json({
        status: 'success',
        data: {
            place: place,
        },
    });
};

exports.deletePlace = async (req, res, next) => {
    const place = await Place.findByIdAndDelete(req.params.id);

    if (!place) return new Error('Local não encontrado!');

    res.status(204).json({
        status: 'success',
        data: null,
    });
};
