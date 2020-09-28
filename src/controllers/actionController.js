const Action = require('../models/actionModel');

exports.getAllActions = async (req, res, next) => {
    const actions = await Action.find().select('-content');

    res.status(200).json({
        status: 'success',
        results: actions.length,
        actions: actions,
    });
};

exports.getActionById = async (req, res, next) => {
    const action = await Action.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        action: action,
    });
};

exports.createAction = async (req, res, next) => {
    const action = await Action.create({
        title: req.body.title,
        subtitle: req.body.subtitle,
        author: req.body.authorId,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        createdAt: Date(),
        updatedAt: Date(),
    });

    res.status(201).json({
        status: 'success',
        data: {
            action: action,
        },
    });
};

exports.updateAction = async (req, res, next) => {
    const body = { ...req.body, updatedAt: Date() };

    const action = await Action.findByIdAndUpdate(req.params.id, body, {
        new: true,
        runValidators: true,
    });

    if (!action) {
        return next(new Error('Ação não encontrada!', 404));
    }

    res.status(200).json({
        status: 'success',
        action: {
            action,
        },
    });
};

exports.deleteAction = async (req, res, next) => {
    const action = await Action.findByIdAndDelete(req.params.id);

    if (!action) return new Error('Ação não encontrada!');

    res.status(204).json({
        status: 'success',
        data: null,
    });
};
