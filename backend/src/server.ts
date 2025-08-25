import app from "./app";
import mongoose from "mongoose";
import "dotenv/config";

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI ||
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster-0.v1jbxee.mongodb.net/?retryWrites=true&w=majority&appName=cluster-0`;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("DB error:", err));
