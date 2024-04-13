const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const LeaveSchema = new Schema(
  {
    employee_id: {
      type: Schema.Types.ObjectId,
      ref: "employee",
      required: true,
    },
    leave_for: {
      type: String,
      enum: ["FULLDAY", "FIRST_HALF", "SECOND_HALF", "CUSTOM"],
      default: "FULLDAY",
    },
    type_of_leave: {
      type: String,
      enum: ["PAID", "UNPAID", "SEEK"],
      default: "PAID",
    },
    leave_from: { type: Date, required: true },
    leave_to: { type: Date, required: true },
    no_of_leave: { type: Number },
    no_of_day: { type: Number },
    leave_status: {
      type: String,
      enum: ["APPROVED", "PENDING", "REJECTED"],
      default: "PENDING",
    },
    is_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: false },
    is_early: { early: { type: Boolean, default: false },no_of_leave_hours: { type: Number }},
    is_late: { late: { type: Boolean, default: false },no_of_leave_hours: { type: Number }},
    total_no_of_leave_hours: { type: Number },
    is_approved: { type: Boolean, default: false },
    approved_by: { type: Schema.Types.ObjectId, ref: "employee" },
    is_rejected: { type: Boolean, default: false },
    rejected_by: { type: Schema.Types.ObjectId, ref: "employee" },
    created_by: { type: Schema.Types.ObjectId, ref: "employee" },
    updated_by: { type: Schema.Types.ObjectId, ref: "employee" },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("leave", LeaveSchema);
