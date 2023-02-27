const mongoose = require('mongoose');

const MoviesSchema = new mongoose.Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    desc: {type: String, required: true},
    imageUrl: {type: String, required: true},
    videoUrl: {type: String, required: true},
    releaseYear: {type: Number, required: true},
    cast: {type: String, required: true},

}, {timestamps: true});

mongoose.models = {}
export default mongoose.model("Movies", MoviesSchema)