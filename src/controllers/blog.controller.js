import { Blog } from "../models/blog.model.js";

// CREATE BLOG
const createBlog = async (req, res) => {

   try {

      const {
         title,
         content,
         category,
         image
      } = req.body;

      if (!title || !content) {
         return res.status(400).json({
            message: "Title and content are required"
         });
      }

      const blog = await Blog.create({
         author: req.user._id,
         title,
         content,
         category,
         image
      });

      return res.status(201).json({
         message: "Blog created successfully",
         blog
      });

   } catch (error) {

      return res.status(500).json({
         message: "Something went wrong",
         error: error.message
      });
   }
};

export {
   createBlog
};