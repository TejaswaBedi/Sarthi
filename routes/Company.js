const express = require("express");
const {
  createCompany,
  fetchAllCompanies,
  fetchCompanyById,
  updateCompany,
} = require("../controller/Company");

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

router.post("/", upload.array("compAttachs"), createCompany);
router.get("/", fetchAllCompanies);
router.get("/:id", fetchCompanyById);
router.patch("/:id", upload.array("compAttachs"), updateCompany);

exports.router = router;
