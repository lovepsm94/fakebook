const PostRouter = require('express').Router();
const PostController = require('./post.controller');
const isAuth = require('../shared/isAuth');

PostRouter.post('/', isAuth, async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;
        const user = req.user;
        const userId = user._id;
        const newPost = await PostController.createPost({ title, description, imageUrl, userId });
        res.send({ success: 1, data: newPost });
    } catch (error) {
        res.send({ success: 0, message: error.message });
    }

})
PostRouter.get('/', async (req, res) => {
    const { page, limit } = req.query;
    console.log(req.query)
    const pageNumber = Number(page) ? Number(page) : 1;
    const limitNumber = Number(limit) ? Number(limit) : 2;
    
    const result = await PostController.getPosts({
        page: pageNumber,
        limit: limitNumber
    });

    res.send({ success: 1, data: result });
})
PostRouter.get('/:id', async (req, res) => {
    const { id } = req.params;    
    const foundPost = await PostController.getPost(id);
    
    res.send({ success: 1, data: foundPost });
})

module.exports = PostRouter; 