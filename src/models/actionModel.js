const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Uma ação precisa ter um título.'],
        trim: true,
    },
    subtitle: {
        type: String,
        required: [true, 'Uma ação precisa ter um subtítulo.'],
        trim: true,
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Uma ação precisa ter um autor.'],
    },
    content: {
        type: String,
        required: [true, 'Uma ação precisa ter conteúdo escrito.'],
    },
    imageUrl: {
        type: String,
        default: 'default-action-thumb.jpg',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

actionSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'author',
        select: 'name',
    });

    next();
});

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;
