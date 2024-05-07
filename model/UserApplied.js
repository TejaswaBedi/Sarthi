const mongoose = require("mongoose");
const { Schema } = mongoose;

const userAppliedSchema = new Schema(
  {
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const virtual = userAppliedSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
userAppliedSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.UserApplied = mongoose.model("UserApplied", userAppliedSchema);
