import express from "express";
import { search_dishes } from "../controllers/search.controller.js";

export const search_route = express.Router();

search_route.get("/dishes", search_dishes)