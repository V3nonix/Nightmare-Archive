const Post = require('../../../models/post');

const { uploadFile, deleteFile } = require('../../../config/awsClientS3');
const errorHandler = require('../../../utils/errorHandler');

async function checkAccess(req, res, next) {
    try {
        const post =  await Post.findOne({ userId: req.user._id, _id: req.body.postId });
        if (!post) res.status(403).json('Access Denied!');
        req.post = post
        return next();
    } catch (err) {
        errorHandler(__dirname, __filename, 'checkAccess', err, 500, res);
    }
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
        res.json(post);
    } catch (err) {
        errorHandler(__dirname, __filename, 'createPost', err, 500, res);
    }
}

async function updatePost(req, res) {
    try {
        const post = await Post.findByIdAndUpdate(req.post._id, req.body.update, { new: true });
        res.json(post);
    } catch (err) {
        errorHandler(__dirname, __filename, 'updatePost', err, 500, res);
    }
}

async function deletePost(req, res) {
    try {
        await deleteFile(req.post.imageKey);
        await Post.findByIdAndDelete(req.body.postId);
        res.status(200).json('File deleted successfully!');
    } catch (err) {
        errorHandler(__dirname, __filename, 'deletePost', err, 500, res);
    }
}

async function getPublicPosts(req, res) {
    try {
        const posts = await Post.find({ public: true }).sort({ createdAt: -1 }).limit(25);
        res.json(posts);
    } catch (err) {
        errorHandler(__dirname, __filename, 'getPublicPosts', err, 500, res);
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

async function getPost(req, res) {
    try {
        const post = await Post.findOne({ _id: req.params.id, public: req.query.publicStatus });
        if (post === null) res.status(404).json('Post not found!');
        if (!post.public && !post.userId.equals(req.user._id)) res.status(403).json('Access Denied!');
        if (post.public) await post.populate({ path : 'comments', populate : {path : 'userId'} });
        res.json(post);
    } catch (err) {
        errorHandler(__dirname, __filename, 'getPost', err, 500, res);
    }
}

module.exports = {
    checkAccess,
    create: createPost,
    update: updatePost,
    delete: deletePost,
    getPublicPosts,
    getUserPosts,
    getPost
};