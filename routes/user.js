const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const router = express.Router();

router.post("/join", async (req, res, next) => {
  const { email, nick, password, birthday, goal } = req.body;
  try {
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      nick,
      password: hash,
      birthday,
      goal,
    });

    return res.status(201).json({ code: 201, message: "가입되었습니다." });
  } catch (err) {
    console.error(err);
    if (err.message === "Validation error") {
      err.status = 403;
      err.message = "존재하는 이메일입니다.";
    }
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "24h",
          issuer: "booktodo",
        });
        return res.json({
          code: 200,
          message: "토큰이 발급되었습니다.",
          response: token,
        });
      } else {
        return res.status(401).json({
          code: 401,
          message: "잘못된 비밀번호입니다.",
        });
      }
    } else {
      return res.status(401).json({
        code: 401,
        message: "가입되지 않은 이메일입니다.",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
