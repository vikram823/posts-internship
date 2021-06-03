const express = require("express")
const router = new express.Router()
const User = require("../models/user");
const auth = require("../middleware/auth")

router.post("/user", async (req, res) => {
    const user = await new User(req.body);
    
    const token = await user.generateAuthToken()

    user.save().then(() => {
      res.status(200).send({user, token});
    }).catch((e) => {
      res.status(400).send(e);
    });
});

module.exports = router