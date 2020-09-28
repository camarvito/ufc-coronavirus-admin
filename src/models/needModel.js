const mongoose = require('mongoose');

const needSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Uma necessidade precisa ter um título!'],
            trim: true,
        },
        subtitle: {
            type: String,
            required: [true, 'Uma necessidade precisa ter um subtítulo!'],
            trim: true,
        },
        manager: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Uma necessidade precisa ter um responsável!'],
        },
        donateText: {
            type: String,
            required: [
                true,
                'Uma necessidade precisa ter um texto explicando como doar!',
            ],
        },
        needyPlaces: [
            {
                place: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Place',
                },
                quantity: Number,
            },
        ],
        situation: {
            type: String,
            required: [true, 'Uma necessidade precisa ter uma situação!'],
        },
        imageUrl: {
            type: String,
            default: 'default-need-thumb.jpg',
        },
        searchUrl: {
            type: String,
            required: [true, 'Uma necessidade precisa ter uma URL de busca!'],
        },
        createdAt: {
            type: Date,
            default: Date(),
        },
        updatedAt: {
            type: Date,
            default: Date(),
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

needSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'manager',
        select: 'name',
    }).populate({
        path: 'needyPlaces',
        populate: {
            path: 'place',
            select: 'name city uf imageUrl',
        },
    });

    next();
});

needSchema.virtual('quantity').get(function () {
    return this.needyPlaces.reduce((acc, obj) => acc + obj.quantity, 0);
});

const Need = mongoose.model('Need', needSchema);

module.exports = Need;
