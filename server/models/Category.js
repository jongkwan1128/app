const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const autoIncrement = require('mongoose-auto-increment');

// autoIncrement.initialize();

const CategorySchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});



// CategorySchema.plugin( autoIncrement.plugin, {model: 'Category', field: 'id', startAt: 1});
module.exports = mongoose.model('Category', CategorySchema);