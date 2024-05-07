const express = require("express");
const {
  addToApply,
  fetchCompaniesByUserId,
  fetchCompaniesByCompId,
} = require("../controller/UserApplied");

const router = express.Router();

router.post("/", addToApply);
router.get("/", fetchCompaniesByUserId);
router.get("/comp", fetchCompaniesByCompId);

exports.router = router;
