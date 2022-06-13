const express = require("express");
const Record = require("../models/record");

const { verifyToken } = require("./middlewares");
const { sequelize } = require("../models");

const router = express.Router();

router.get("/:month", verifyToken, async (req, res, next) => {
  try {
    const records = await Record.findAll({
      where: {
        UserId: req.decoded.id,
        $and: sequelize.where(
          sequelize.fn("MONTH", sequelize.col("date")),
          parseInt(req.params.month)
        ),
      },
    });

    res.json({
      code: 200,
      message: "기록이 조회되었습니다.",
      response: records,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/", verifyToken, async (req, res, next) => {
  const { isbn, page } = req.body;
  try {
    const exRecord = await Record.findOne({
      where: {
        UserId: req.decoded.id,
        isbn: isbn,
        $and: sequelize.where(
          sequelize.fn("DATE", sequelize.col("date")),
          sequelize.literal("CURRENT_DATE")
        ),
      },
    });

    if (exRecord) {
      const record = await exRecord.update({ page: exRecord.page + page });

      res.status(201).json({
        code: 201,
        message: "기록이 수정되었습니다.",
        response: record,
      });
    } else {
      const record = await Record.create({
        UserId: req.decoded.id,
        isbn,
        page,
      });

      res.status(201).json({
        code: 201,
        message: "기록이 생성되었습니다.",
        response: record,
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
