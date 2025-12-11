import express, { json } from "express";
import dotenv from 'dotenv'
import { search_route } from "./src/routes/search.routes.js";
dotenv.config();

const PORT = process.env.PORT;
const app = express();
// app.use(json())

app.use("/api/search", search_route)


app.listen(PORT, () => {
    console.log(`server is runing on ${PORT}`)
})