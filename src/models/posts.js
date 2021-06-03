const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const validator = require("validator");

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  likes: [
    {
      type: ObjectId,
      ref: "User",
      unique: true
    }
  ],
  dislikes: [
    {
      type: ObjectId
    }
  ]
});

postsSchema.statics.findByTitle = async (title) => {
  const post = await Posts.findOne({ title });
  if (!post) {
    throw new Error("Unable to find post");
  }

  return post;
};

const Posts = mongoose.model("Posts", postsSchema);

module.exports = Posts;
