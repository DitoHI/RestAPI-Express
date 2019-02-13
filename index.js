var express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./src/routes/crmRoutes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const BlogSchema = require('./src/models/crmModel');
const blogModel = mongoose.model('blog', BlogSchema);

app.post('/newBlog', (req, res) => {
    let blog = new blogModel(req.body);
    blog.save((err, blogModel)=> {
        if (err) {
            res.send(err);
        }
        res.json(blog);
    })
});

let getAllBlogs = (req, res) => {
    blogModel.find({}, (err, blogs) => {
        if (err) {
            res.send(err);
        } else {
            res.send(blogs);
        }
    });
};

app.get('/getBlogs', getAllBlogs);

let getBlogById = (req, res) => {
    blogModel.findById((req.params.blogId), (err, blog) => {
        if (err) {
            res.send(err);
        }
        res.send(blog);
    })
};

app.get('/blog/:blogId', getBlogById);

// Create and Update

let updateBlog = (req, res) => {
    blogModel.findOneAndUpdate({_id: req.params.blogId}, req.body, {new: true}, (err, updatedBlog) => {
        if (err) {
            res.send(err);
        }
        res.send(updatedBlog);
    })
};

app.put('/blog/:blogId', updateBlog);

let deleteBlog = (req, res) => {
    blogModel.remove({_id: req.params.blogId}, (err) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Blog deleted successfully' });
    });
};

app.delete('/blog/:blogId', deleteBlog);

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Your server is running on port: ${PORT}`);
});
