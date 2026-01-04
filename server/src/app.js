import cors from "cors";
import express from "express";
import router from "./routes/node.routes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/nodes", router);

app.get("/api/health", (req, res) => {
  res.json({ status: "Server running" });
});

export default app;
