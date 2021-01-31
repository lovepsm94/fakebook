require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const AuthRouter = require('./modules/auth/auth.route');
const PostRouter = require('./modules/posts/post.route');
const log = require('./modules/shared/log')


mongoose.connect(process.env.MONGODB_URI, { useCreateIndex: true, autoIndex: true }, (err) => {
    if (err) throw err;
    console.log('MongoDB connected')
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(log);

app.use('/api/auth', AuthRouter);
app.use('/api/posts', PostRouter);

app.listen(8080, (err) => {
    if (err) throw err;
    console.log('server started');
})

