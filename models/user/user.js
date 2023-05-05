const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// User Schema:
const userSchema = new Schema({
    name: {
        type: String, 
        required: true,
        maxLength: 32,
        minLength: 3,
    },
    avatar: { type: String, default: ''},
    email: {
      type: String,
      unique: [true, 'An account with this email already exists!'],
      trim: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
          delete ret.password;
          return ret;
        }
    }
});

/* User Schema VIRTUALS */

/* User Schema STATICS */

/* User Schema MIDDLEWARE */

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const saltRounds = parseInt(process.env.SALT_ROUNDS)
    this.password = await bcrypt.hash(this.password, saltRounds);
    return next();
});


module.exports = mongoose.model('User', userSchema);