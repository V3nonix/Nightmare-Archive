const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Comment Schema:
const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    contents: {        
        type: String,
        maxLength: 1547,
        minLength: 1,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);