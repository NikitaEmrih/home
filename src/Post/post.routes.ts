import express from 'express';
import { PostController } from './post.controller';

export const PostRouter: express.Router = express.Router();

PostRouter.get("/posts", PostController.getAll);
PostRouter.get("/posts/:id", PostController.getById);
PostRouter.post("/posts", PostController.create);
PostRouter.patch('/posts/:id', PostController.update);
