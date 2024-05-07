const express = require("express");
const {
  fetchAllNotices,
  createNotice,
  fetchNoticeById,
  updateNotice,
} = require("../controller/Notice");
const { upload } = require("../upload");

const router = express.Router();

router.get("/", fetchAllNotices);
router.post("/", upload.array("noticeAttachs"), createNotice);
router.get("/:id", fetchNoticeById);
router.patch("/:id", upload.array("noticeAttachs"), updateNotice);

exports.router = router;
