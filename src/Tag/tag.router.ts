import express from "express";
import { TagController } from "./tag.controller";

export const TagRouter: express.Router = express.Router();

TagRouter.get("/tags", TagController.getAll);
TagRouter.get("/tags/:id", TagController.getById);
