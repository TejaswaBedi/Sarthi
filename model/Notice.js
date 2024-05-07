const mongoose = require("mongoose");
const { Schema } = mongoose;

const noticeSchema = new Schema(
  {
    noticeMsg: { type: String, required: true },
    noticeAttachs: { type: [String], default: [] },
    description: { type: String, required: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const virtual = noticeSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
noticeSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Notice = mongoose.model("Notice", noticeSchema);
