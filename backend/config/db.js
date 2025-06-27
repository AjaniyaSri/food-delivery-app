import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect("mongodb+srv://ajaniyaje23:ajaniyasri@cluster0.j6xxgdp.mongodb.net/food-del").then(()=>console.log("DB connected"));
};
