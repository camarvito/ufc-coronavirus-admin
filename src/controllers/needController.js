const Need = require('../models/needModel');

exports.getAllNeeds = async (req, res, next) => {
    const needs = await Need.find().select('-donateText');

    res.status(200).json({
        status: 'success',
        results: needs.length,
        needs: needs,
    });
};

exports.getNeedById = async (req, res, next) => {
    const need = await Need.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        need: need,
    });
};

exports.createNeed = async (req, res, next) => {
    const need = await Need.create({
        title: req.body.title,
        subtitle: req.body.subtitle,
        manager: req.body.managerId,
        donateText: req.body.donateText,
        needyPlaces: req.body.needyPlaces,
        situation: req.body.situation,
        imageUrl: req.body.imageUrl,
        searchUrl: req.body.searchUrl,
        quantity: req.body.quantity,
    });

    res.status(201).json({
        status: 'success',
        data: {
            need,
        },
    });
};

exports.updateNeed = async (req, res, next) => {
    const updatedNeed = { ...req.body, updatedAt: Date() };

    const need = await Need.findByIdAndUpdate(req.params.id, updatedNeed, {
        new: true,
        runValidators: true,
    });

    if (!need) return new Error('Necessidade não encontrada!');

    res.status(200).json({
        status: 'success',
        data: {
            need,
        },
    });
};

exports.deleteNeed = async (req, res, next) => {
    const need = await Need.findByIdAndDelete(req.params.id);

    if (!need) return new Error('Necessidade não encontrada!');

    res.status(204).json({
        status: 'success',
        data: null,
    });
};
