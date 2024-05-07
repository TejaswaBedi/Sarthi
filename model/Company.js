const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema(
  {
    name: { type: String, required: true },
    field: { type: String, default: "Unknown" },
    scheduled: { type: String, default: "TBD" },
    ctc: { type: String, default: "Unknown" },
    compAttachs: { type: [String], default: [] },
    description: { type: String, default: "Will be communicated soon." },
    type: { type: String, default: "Service" },
    url: { type: String, default: "" },
    cgpa: { type: String, default: "7" },
    ten: { type: String, default: "70" },
    twelve: { type: String, default: "70" },
    backlogs: { type: String, default: "0" },
    vacancy: { type: String, default: "Unknown" },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const virtual = companySchema.virtual("id");
virtual.get(function () {
  return this._id;
});
companySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Company = mongoose.model("Company", companySchema);
