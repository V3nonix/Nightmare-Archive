const Post = require('../../../models/post');

const { uploadFile, deleteFile } = require('../../../config/aws');

async function create(req, res) {
    try {
        const uploadRes = await uploadFile(req.file);
        const post = await Post.create({
            ...req.body.formData,
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