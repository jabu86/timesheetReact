import mongoose from "mongoose";

const TimeCardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    name: { type: String,  required: true },
    project: { type: String, required: true },
    company: { type: String,  required: true },
    status: { type: Boolean , default : false},
    from: { type: Date, required: true },
    to: { type: Date, required : true },
    description: { type: String , required: true},
    monday: [
      {
        hours: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },{ timestamps: true },
    ],
    tuesday: [
      {
        hours: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },{ timestamps: true },
    ],
    wendsday: [
      {
        hours: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },{ timestamps: true },
    ],
    thursday: [
      {
        hours: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },{ timestamps: true },
    ],
    friday: [
      {
        hours: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },{ timestamps: true },
    ],
    satarday: [
      {
        hours: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },{ timestamps: true },
    ],
    sunday: [
      {
        hours: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },{ timestamps: true },
    ],
  },
  { timestamps: true }
);


const TimeCard = mongoose.model('timecard', TimeCardSchema);
export default TimeCard;