const Blogs = require("../models/blog");
const mongoose = require("mongoose");

exports.blog_get_all = (req, res) => {
    Blogs.find()
        .exec()
        .then(docs => {
            res.status(200).send(docs)
        })
        .catch(error => {
            res.status(500).send(error)
        });
}

exports.blog_get_one = (req, res) => {
    const id = req.params.blogId;
    Blogs.findById(id)
        .exec()
        .then(response => {
            res.status(200).send(response)
        })
        .catch(error => {
            res.status(500).send(error)
        });
}

exports.blog_post = (req, res) => {

    const blog_object = new Blogs({
        name: req.body.name,
        image: req.body.image,
        content: req.body.content

    });

    blog_object.save()
        .then(response => {
            console.log(response);
            res.status(201).send(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                err: error
            });
        });
}

exports.blog_patch_one = (req, res) => {
    const id = req.params.blogId;
    const updatedBlog = {};
    console.log(req.body)
    for (const p in req.body) {
        console.log(p)
        updatedBlog[p] = req.body[p];
    }
    console.log(updatedBlog)
    Blogs.update({ _id: id }, { $set: updatedBlog })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "Blog uploaded"
            })
        })
        .catch(error => {
            res.status(500).send(error)
        });
}
exports.blog_delete_one = (req, res) => {
    const id = req.params.blogId;
    Blogs.remove({ _id: id })
        .exec()
        .then(reult => {
            res.status(200).json({
                message: "blog deleted"
            })
        })
        .catch(error => {
            res.status(500).send(error)
        });
}