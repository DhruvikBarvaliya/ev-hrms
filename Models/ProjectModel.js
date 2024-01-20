const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const ProjectSchema = new Schema(
  {
    leader_id: {
      type: Schema.Types.ObjectId,
      ref: "employee",
      required: true,
    },
    project_name: { type: String, trim: true },
    client_name: { type: String, trim: true },
    type_of_project: {
      type: String,
      enum: ["FULL_TIME", "PART_TIME", "CONTRACT"],
      default: "FULL_TIME",
    },
    date_of_start: { type: Date },
    date_of_end: { type: Date },
    project_status: { type: String, trim: true },
    is_active: { type: Boolean, default: false },
    is_c2c: { type: Boolean, default: false },
    created_by: { type: Schema.Types.ObjectId, ref: "employee" },
    updated_by: { type: Schema.Types.ObjectId, ref: "employee" },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("project", ProjectSchema);
