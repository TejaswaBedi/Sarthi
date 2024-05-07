const { Company } = require("../model/Company");

exports.createCompany = async (req, res) => {
  try {
    const companyData = req.body;

    if (req.files.length == 0) {
      companyData.compAttachs = [];
    }
    if (req.files.length > 0) {
      const attachments = [];
      const attachFiles = req.files;
      for (let idx = 0; idx < attachFiles.length; idx++) {
        attachments.push(attachFiles[idx].filename);
      }
      companyData.compAttachs = attachments;
    }
    const company = new Company(companyData);
    const response = await company.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllCompanies = async (req, res) => {
  try {
    const company = await Company.find({}).sort({
      updatedAt: -1,
    });
    res.status(200).json(company);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    res.status(200).json(company);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const companyData = req.body;
    if (req.files.length > 0) {
      const attachments = [];
      const attachFiles = req.files;
      for (let idx = 0; idx < attachFiles.length; idx++) {
        attachments.push(attachFiles[idx].filename);
      }
      companyData.compAttachs = attachments;
    }
    const { id } = req.params;
    const company = await Company.findByIdAndUpdate(id, companyData, {
      new: true,
    });
    res.status(200).json(company);
  } catch (err) {
    res.status(400).json(err);
  }
};
