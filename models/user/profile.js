const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signCloudFrontUrl = require('../../config/awsClientSigner');

const profileSchema = new Schema({ 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    about: { type: String, maxLength: 750, default: '' },
    avatarKey: {type: String, default: ''},
    avatarUrl: {type: String, default: ''},
}, {
    toJSON: { 
        virtuals: true,
        transform: function(doc, ret) {
            delete ret.__v;
            delete ret.avatarKey;
            delete ret.avatarUrl;
        }
    }
});

/* Post Schema VIRTUALS */

profileSchema.virtual('signedAvatarUrl').get(function() {
    try {
        const signedUrl = signCloudFrontUrl(this.avatarUrl);
        return signedUrl;
    } catch (err) {
        console.error('Error signing CloudFront URL:', err);
        return false;
    }
});

module.exports = mongoose.model('Profile', profileSchema);