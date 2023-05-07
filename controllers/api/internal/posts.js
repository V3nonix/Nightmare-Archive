const Post = require('../../../models/post');

const { uploadFile, deleteFile } = require('../../../config/aws');
const errorHandler = require('../../../utils/errorHandler');

async function create(req, res) {
    try {
        const uploadRes = await uploadFile(req.file);
        const post = await Post.create({
            ...req.body,
            userId: req.user._id,
            imageKey: uploadRes.key,
            imageUrl: uploadRes.url
        });
        res.json(post);
    } catch (err) {
        errorHandler(__dirname, __filename, 'create', err, 500, res);
    }
}

module.exports = {
    create,
};