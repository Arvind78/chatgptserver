const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../model/UserModel");

const Signup = async (req, res) => {
  try {
    const checkUser = await userModel.findOne({ email: req.body.email });
    console.log(req.body);
    if (checkUser)
      return res.status(409).json({ message: "user already account exits" });
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await userModel.create({
      ...req.body,
      password: hashPassword,
    });
    res
      .status(200)
      .json({ user: newUser, message: "user account created successfully" });
  } catch (err) {
    res.send(err);
    return false;
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await userModel.findOne({ email });
    if (!checkUser)
      return res.status(404).json({ message: "user account doesn't exits" });
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword)
      return res.status(404).json({ message: "email or password invaild" });
    const token = jwt.sign({ id: checkUser._id }, process.env.Secrat_Key);

    res
      .status(200)
      .json({ user: checkUser, token, message: "user login successfully" });
  } catch (err) {
    res.send(err);
    return false;
  }
};

const forgetPassword = async (req, res) => {
  const { email, password, userId } = req.body;
  try {
    if (userId) {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const updateUser = await userModel.findByIdAndUpdate(
        userId,
        { $set: { password: hashPassword } },
        { new: true }
      );
      res
        .status(200)
        .json({
          user: updateUser,
          message: "user password forgot successfully",
        });
    } else {
      const checkUser = await userModel.findOne({ email });
      if (!checkUser)
        return res.status(404).json({ message: "user account doesn't exits" });
      res
        .status(200)
        .json({
          userId: checkUser._id,
          message: "user email verify successfully",
        });
    }
  } catch (err) {
    res.send(err);
    return false;
  }
};

const Chat = async (req, res) => {
 const {prompt} = req.body
  const option = {
    method:"POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
 
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  };
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions",option);
    const result = await response.json();
    res.send(result) ;
  } catch (error) {
   res.send(error.message )
  }
};

module.exports = { Signup, Login, forgetPassword, Chat };




