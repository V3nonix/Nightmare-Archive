const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Post Schema:
const postSchema = new Schema({
    title: {   
        type: String, 
        required: true,
        maxlength: 32,
        minlength: 1,
    },
    imageKey: {type: String, required: true},
    imageUrl: {type: String, required: true},
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        maxlength: 3000,
        minlength: 1,
        default: ''
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        maxlength: 500,
        ref: "Comment"
    }
});

/* User Schema VIRTUALS */

/* User Schema STATICS */

/* User Schema MIDDLEWARE */

module.exports = mongoose.model('Post', postSchema);