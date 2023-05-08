const Post = require('../../../models/post');

const { uploadFile, deleteFile } = require('../../../config/aws');
const errorHandler = require('../../../utils/errorHandler');

async function checkAccess(req, res) {
    const post =  await Post.findOne({ userId: req.user._id, _id: req.body.postId });
    if (!post) res.status(400).json('Access Denied!');
    req.imageKey = post.imageKey
    return next();
}

async function createPost(req, res) {
    try {
        const uploadRes = await uploadFile(req.file);
        const post = await Post.create({
            ...req.body,
            userId: req.user._id,
            imageKey: uploadRes.key,
            imageUrl: uploadRes.url
        });
        res.json(post._id);
    } catch (err) {
        errorHandler(__dirname, __filename, 'createPost', err, 500, res);
    }
}

async function updatePost(req, res) {
    try {

    } catch (err) {
        errorHandler(__dirname, __filename, 'updatePost', err, 500, res);
    }
}

async function deletePost(req, res) {
    try {
        await deleteFile(req.imageKey);
        await Post.findByIdAndDelete(req.postId);
        res.status(200).json('File deleted successfully');
    } catch (err) {
        errorHandler(__dirname, __filename, 'deletePost', err, 500, res);
    }
}

async function getUserPosts(req, res) {
    try {
        const posts = await Post.find({ userId: req.user._id });
        res.json(posts);
    } catch (err) {
        errorHandler(__dirname, __filename, 'getUserPosts', err, 500, res);
    }
}

module.exports = {
    checkAccess,
    create: createPost,
    update: updatePost,
    delete: deletePost,
    getUserPosts,
};