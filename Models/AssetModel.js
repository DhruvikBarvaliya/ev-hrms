const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const AssetSchema = new Schema(
  {
    asset_type: {
      type: String,
      enum: ["KEYBORD", "MOUSE", "MONITORE", "OTHER",],
      default: "KEYBORD",
    },
    asset_name: { type: String, trim: true },
    asset_model_no: { type: String },
    asset_serial_no: { type: String },
    date_of_purchase: { type: Date },
    project_id: { type: Schema.Types.ObjectId, ref: "project" },
    brand_name: { type: String },
    status: { type: String, trim: true },
    is_active: { type: Boolean, default: false },
    created_by: { type: Schema.Types.ObjectId, ref: "employee" },
    updated_by: { type: Schema.Types.ObjectId, ref: "employee" },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("asset", AssetSchema);
