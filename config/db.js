import mongoose from "mongoose";
import config from "config";
const db = config.get("mongoURI");

const connetDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
       useCreateIndex: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);
    //Exit proccess with failur
    process.exit(1);
  }
};

export default connetDB;
