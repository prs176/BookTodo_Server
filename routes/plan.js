const express = require("express");
const Plan = require("../models/plan");
const cors = require("cors");

const { verifyToken } = require("./middlewares");

const router = express.Router();

router.use(cors({ credentials: true }));

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const plans = await Plan.findAll({
      where: { UserId: req.decoded.id },
    });

    res.json({
      code: 200,
      message: "목표가 조회되었습니다.",
      response: plans,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/", verifyToken, async (req, res, next) => {
  try {
    await Plan.destroy({ where: { UserId: req.decoded.id } });

    const plans = await Promise.all(
      req.body.days.map((day) => {
        return Plan.create({ UserId: req.decoded.id, day });
      })
    );

    res.status(201).json({
      code: 201,
      message: "목표가 수정되었습니다.",
      response: plans,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
