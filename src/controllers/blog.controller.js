import { Blog } from "../models/blog.model.js";
import { Notification } from "../models/notification.model.js";


// CREATE BLOG
const createBlog = async (req, res) => {
  try {
    const { title, content, category, image } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const blog = await Blog.create({
      author: req.user._id,
      title,
      content,
      category,
      image,
    });

    return res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//GET ALL BLOG
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "fullname username profileImage")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

// GET SINGLE BLOG
const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "fullname username profileImage",
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    return res.status(200).json({
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//LIKE / UNLIKE BLOG
const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    const alreadyLiked = blog.likes.includes(req.user._id);
    if (alreadyLiked) {
      //unlike
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== req.user._id.toString(),
      );
    } else {
      //like
      blog.likes.push(req.user._id);
      //create notification for blog author
      if (blog.author.toString() !== req.user._id.toString()) {
        await Notification.create({
         receiver: blog.author,
         sender: req.user._id,
         type: "like",
         message: `${req.user.fullname} liked your blog`,
        });
      }
    }
    await blog.save();
    return res.status(200).json({
      message: alreadyLiked ? "Blog unliked" : "Blog liked",
      totalLikes: blog.likes.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//COMMENT ON BLOG
const commentOnBlog = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({
        message: "Comment text is required",
      });
    }
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    blog.comments.push({
      user: req.user._id,
      text,
    });
    await blog.save();
    return res.status(200).json({
      message: "Comment added successfully",
      comments: blog.comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// UPDATE BLOG
const updateBlog = async (req, res) => {
  try {
    const { title, content, category, image } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    // ONLY BLOG OWNER CAN UPDATE
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized action",
      });
    }
    // update fields
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (category) blog.category = category;
    if (image) blog.image = image;
    await blog.save();
    return res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// DELETE BLOG
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    // ONLY BLOG OWNER CAN DELETE
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized action",
      });
    }
    await blog.deleteOne();
    return res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//GET MY BLOGS
const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      author: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  likeBlog,
  commentOnBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs,
};
