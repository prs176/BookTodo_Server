const express = require("express");
const { Book, Record } = require("../models");

const { verifyToken } = require("./middlewares");

const router = express.Router();

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const books = await Book.findAll({
      where: { userId: req.decoded.id },
      include: [
        {
          model: Record,
          as: "Records",
        },
      ],
    });

    res.json({
      code: 200,
      message: "책이 조회되었습니다.",
      response: books,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:isbn", verifyToken, async (req, res, next) => {
  try {
    const book = await Book.findOne({
      where: { userId: req.decoded.id, isbn: req.params.isbn },
      include: [
        {
          model: Record,
          as: "Records",
        },
      ],
    });

    if (book) {
      res.json({
        code: 200,
        message: "책이 조회되었습니다.",
        response: book,
      });
    } else {
      res.status(404).json({
        code: 404,
        message: "사용자 소유의 책이 아닙니다.",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/", verifyToken, async (req, res, next) => {
  try {
    const book = await Book.create({
      UserId: req.decoded.id,
      isbn: req.body.isbn,
    });

    res.status(201).json({
      code: 201,
      message: "책이 추가되었습니다.",
      response: book,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/:isbn", verifyToken, async (req, res, next) => {
  try {
    await Book.destroy({
      where: {
        UserId: req.decoded.id,
        isbn: req.params.isbn,
      },
    });

    res.status(201).json({
      code: 201,
      message: "책이 삭제되었습니다.",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
