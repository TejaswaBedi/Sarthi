const { UserApplied } = require("../model/UserApplied");

exports.fetchCompaniesByUserId = async (req, res) => {
  const { user } = req.query;
  try {
    const userCompany = await UserApplied.find({ user: user })
      .populate("user")
      .populate("company")
      .sort({ updatedAt: -1 });
    res.status(200).json(userCompany);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchCompaniesByCompId = async (req, res) => {
  const { user } = req.query;
  try {
    const userCompany = await UserApplied.find({ company: user })
      .populate("user")
      .populate("company")
      .sort({ updatedAt: -1 });
    res.status(200).json(userCompany);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.addToApply = async (req, res) => {
  try {
    const apply = new UserApplied(req.body);
    const doc = await apply.save();
    const result = await doc.populate("company");
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};
