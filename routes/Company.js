const express = require("express");
const {
  createCompany,
  fetchAllCompanies,
  fetchCompanyById,
  updateCompany,
} = require("../controller/Company");
const { upload } = require("../upload");

const router = express.Router();

router.post("/", upload.array("compAttachs"), createCompany);
router.get("/", fetchAllCompanies);
router.get("/:id", fetchCompanyById);
router.patch("/:id", upload.array("compAttachs"), updateCompany);

exports.router = router;
