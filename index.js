import express from "express";
import dotenv from "dotenv";
import { search_route } from "./src/routes/search.routes.js";
import prisma from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

// Helth check
app.get("/", async (req, res) => {
  return res.status(200).send({ status: true, message: "Health is good!" })

});
// Search route
app.use("/search", search_route);

// Start server
app.listen(PORT, async () => {
  await prisma.$connect();
  console.log("✅ Database connected");
  console.log(`🚀 Server running on port ${PORT}`);
});
