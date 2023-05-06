const User = require('../../../models/user/user');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const errorHandler = require('../../../utils/errorHandler');


function createJWT(user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}


async function create(req, res) {
    try {
        const user = await User.create(req.body);
        const token = createJWT(user);
        res.json(token);
    } catch (err) {
        errorHandler(__dirname, __filename, 'create', err, 500, res);
    }
}


async function passwordCompare(password, hash) {
    match = await bcrypt.compare(password, hash);
    return match;
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email});
        if (user && passwordCompare(req.body.password, user.password)) {
            const token = createJWT(user);
            res.json(token);
        } else {
            res.status(400).json('Bad Credentials!');
        }
    } catch (err) {
        errorHandler(__dirname, __filename, 'login', err, 500, res);
    }
}


module.exports = {
    create,
    login,
};