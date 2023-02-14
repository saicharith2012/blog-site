const express = require("express");
const router = express.Router();

const blogControllers = require("../controllers/blogControllers");
// all blogs
router.get("/", blogControllers.blog_index);

// go to get create blog page
router.get("/create", blogControllers.blog_create_get);

// Post request handler for create page
router.post("/", blogControllers.blog_create_post);

// get request for route parameters === id
router.get("/:id", blogControllers.blog_details);

// delete request
router.delete("/:id", blogControllers.blog_delete);

module.exports = router;
