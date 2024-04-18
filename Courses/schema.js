import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    name: String,
    number: String,
    department: String,
    startDate: Date,
    endDate: Date,
    credits: Number,
    description: String,
  },
  { collection: "courses" }
);
export default courseSchema;