import express from "express";
import connectDB from "./config/db.js";
import columnRoute from "./routes/column.route.js";
import todoRoute from "./routes/todo.route.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || "5000";
app.use(express.json())
app.use(cors({origin:"http://localhost:5173",credentials:true}));

app.use("/api/column", columnRoute);
app.use("/api/todo", todoRoute);

app.listen(PORT , () => {
  console.log(`Server run this link http://localhost:${PORT}`)
  connectDB();
})