const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const blogController = require("../controllers/blog");

router.get("/", blogController.blog_get_all);

router.get("/:blogId", blogController.blog_get_one);

router.post("/", checkAuth, blogController.blog_post);

router.patch("/:blogId", checkAuth, blogController.blog_patch_one);

router.delete("/:blogId", checkAuth, blogController.blog_delete_one);

module.exports = router;