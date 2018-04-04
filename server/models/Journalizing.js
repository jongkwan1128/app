const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JournalizingSchema = new Schema({
    datetime: {
        type: Date,
        default: Date.now()
    },
    option: {
        type: Boolean,
        default: true
    },
    category: {
        type: Schema.Types.ObjectId, ref: 'Category'
    },
    amount: {
      type: Number,
      default: 0
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
module.exports = mongoose.model('Journalizing', JournalizingSchema);