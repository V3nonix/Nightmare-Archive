const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signCloudFrontUrl = require('../config/awsClientSigner');

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
        heart: { type: [Schema.Types.ObjectId], ref: "User" },
        like: { type:   [Schema.Types.ObjectId], ref: "User" },
        laugh: { type: [Schema.Types.ObjectId], ref: "User" }
    },
}, {
    timestamps: true,
    toJSON: { 
        virtuals: true,
        transform: function(doc, ret) {
            delete ret.__v;
            delete ret.imageUrl;
            delete ret.imageKey;
        }
    }
});

/* Post Schema VIRTUALS */

postSchema.virtual('signedImageUrl').get(function() {
    try {
        const signedUrl = signCloudFrontUrl(this.imageUrl);
        return signedUrl;
    } catch (err) {
        console.error('Error signing CloudFront URL:', err);
        return false;
    }
});

/* Post Schema STATICS */

/* Post Schema MIDDLEWARE */

module.exports = mongoose.model('Post', postSchema);