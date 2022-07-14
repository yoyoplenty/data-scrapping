const mongoose = require("mongoose"),
    dataSchema = new mongoose.Schema({
        url: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        img_url: {
            type: String,
            required: true,
        },
    });

module.exports = mongoose.model("Data", dataSchema);
