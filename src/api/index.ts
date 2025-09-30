import express from "express";
import cors from "cors";
import taskRoutes from "../routes/task.route"
import authRoutes from "../routes/auth.route"

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000")
});