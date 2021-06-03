const mongoose = require("mongoose");
const validator = require("validator")
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate(value){
        if(!validator.isEmail(value)){
            throw new error("Invalid email")
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    tokens: [{
        token: {
          type: String,
          required: true
        }
      }]

  })

  userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'secret')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
   }

const User = mongoose.model("User", userSchema);

module.exports = User