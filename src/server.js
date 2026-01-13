import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks.routes.js";

const app = express();

const port = 3001;

// Middleware globali
app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);

//Route di test
app.get("/", (req, res) => {
  res.send("Backend is running");
});

//Avvio server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
