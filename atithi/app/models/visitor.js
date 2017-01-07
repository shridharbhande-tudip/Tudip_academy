var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var now = require("date-now");



module.exports = mongoose.model('Visitor', new Schema({
        name: {
            type: String,
            required: true,
            validate: /^[a-zA0-Z9][a-zA-Z\\w]$/
        },

        email: {
            type: String,
            required: true,
            unique: true,
            validate: /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
            unique: true
        },

        phone_no: {
            type: Number,
            required: true,
            validate: /^\d{10}$/,
            unique: true
        },

        in_time: {
            type: Date,
            default: Date.now()
        },
        out_time: {
            type: Date,
            default: Date.now()
        },

        user_id: {
            type: String
        }
    },

    {
        timestamps: {created: 'created_at', updatedAt: 'updated_at'}
    }));
