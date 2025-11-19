import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;
  const mongoUser = process.env.MONGODB_USER;
  const mongoPassword = process.env.MONGODB_PASSWORD;
  const mongoDBName = process.env.MONGODB_DB_NAME;

  if (!mongoURI || !mongoUser || !mongoPassword || !mongoDBName) {
    throw new Error("Missing MongoDB configuration");
  }

  try {
    await mongoose.connect(
      `mongodb+srv://${mongoUser}:${encodeURIComponent(
        mongoPassword
      )}@${mongoURI}/${mongoDBName}?retryWrites=true&w=majority`
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
  process.exit(1);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

export default mongoose;
