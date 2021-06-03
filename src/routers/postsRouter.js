const express = require("express");
const router = new express.Router();
const Posts = require("../models/posts");

const auth = require("../middleware/auth");

router.post("/posts", auth, async (req, res) => {
  const posts = await new Posts(req.body);

  posts
    .save()
    .then(() => {
      res.status(201).send(posts);
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send(e);
    });
});

router.get("/posts", async (req, res) => {
  await Posts.find()
    .then((post) => {
      if (!post) {
        return res.status(404).send();
      }
      res.send(post);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

router.patch("/posts/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.delete("/posts/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const post = await Posts.findByIdAndDelete(_id);

    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/findPost", async (req, res) => {
  try {
    const post = await Posts.findByTitle(req.body.title);

    if (!post) {
      return res.send(404).send(e);
    }

    res.send(post);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.put("/like", auth, async (req, res) => {
  try {
    const likedPost = await Posts.findByIdAndUpdate(
      req.body.postId,
      {
        $push: {
          likes: req.user._id,
        },
      },
      {
        new: true,
      }
    );

    if (!likedPost) {
      return res.status(404).send();
    }
    res.send(likedPost);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put("/dislike", auth, async (req, res) => {
  try {
    const dislikedPost = await Posts.findByIdAndUpdate(
      req.body.postId,
      {
        $push: {
          dislikes: req.user._id,
        },
      },
      {
        new: true,
      }
    );

    if (!dislikedPost) {
      return res.status(404).send();
    }

    // dislikedPost.likes = dislikedPost.likes.filter((userId) => {
    //   return userId !== req.user._id;
    // });
 
    // await dislikedPost.save();

    res.send(dislikedPost);
  } catch (e) {
    console.log(e)
    res.status(400).send(e);
  }
});

module.exports = router;
