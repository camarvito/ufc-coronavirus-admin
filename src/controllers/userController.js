const User = require('../models/userModel');

exports.getAllUsers = async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: 'success',
        results: users.length,
        users: users,
    });
};

exports.getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        user,
    });
};

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

exports.createUser = async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        locale: req.body.locale,
    });

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser,
        },
    });
};

exports.updateUser = async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!user) return new Error('Usuário não encontrado!');

    res.status(200).json({
        status: 'success',
        data: {
            user: user,
        },
    });
};

exports.deleteUser = async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return new Error('Usuário não encontrado!');

    res.status(204).json({
        status: 'success',
        data: null,
    });
};
