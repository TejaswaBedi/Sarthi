const express = require("express");
const {
  fetchAllNotices,
  createNotice,
  fetchNoticeById,
  updateNotice,
} = require("../controller/Notice");

const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./files");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", fetchAllNotices);
router.post("/", upload.array("noticeAttachs"), createNotice);
router.get("/:id", fetchNoticeById);
router.patch("/:id", upload.array("noticeAttachs"), updateNotice);

exports.router = router;
