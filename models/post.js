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
    },
    public: {
        type: Boolean,
        default: false
    },
    reactions: {
        heart: { type: Number, default: 0},
        like: { type: Number, default: 0},
        laugh: { type: Number, default: 0}
    }
}, {
    timestamps: true,
    toJSON: { 
        virtuals: true,
        transform: function(doc, ret) {
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
        }
    }
});

/* Post Schema VIRTUALS */

postSchema.virtual('archivedAt').get(function() {
    return new Date(this.createdAt);
});

postSchema.virtual('editedAt').get(function() {
    return new Date(this.updatedAt);
});

/* Post Schema STATICS */

/* Post Schema MIDDLEWARE */

module.exports = mongoose.model('Post', postSchema);