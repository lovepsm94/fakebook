const PostModel = require('./post');

const createPost = async ({ title, description, imageUrl, userId }) => {
    const newPost = await PostModel.create({ title, description, imageUrl, userId });
    return newPost;
}

const getPosts = async ({ page, limit }) => {
    const offset = (page - 1) * limit;
    const post = await PostModel.find().skip(offset).limit(limit).sort({ createdAt: -1 }).populate('userId', '-password');
    const total = await PostModel.find().count();

    return { data: post, total };
}

const getPost = async (id) => {
    const foundPost = await PostModel.findById(id);
    if (!foundPost) throw new Error('Post not found');

    return foundPost;
}

module.exports = {
    createPost,
    getPosts,
    getPost
}