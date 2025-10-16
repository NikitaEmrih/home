
import { Request, Response } from "express"
import { PostService } from "./post.service"

export const PostController = {
     getAll: (req: Request, res: Response) => {
        const { skip, take } = req.query;

        if (skip && isNaN(+skip)) {
            res.status(400).json("skip must be a number");
            return
        }
        if (take && isNaN(+take)) {
            res.status(400).json("take must be a number");
            return
        }

        const posts = PostService.getAll(
            skip ? Number(skip) : undefined,
            take ? Number(take) : undefined
        );
        res.status(200).json(posts);
    },

    getById: (req: Request, res: Response) => {
        if (!req.params.id){
            res.status(400).json("id is required");
            return
        }
        const id = +req.params.id
        

        if (isNaN(id)) {
             res.status(400).json("id must be a number");
             return
        }

        const post = PostService.getById(id);
        if (!post) {
            res.status(404).json("post not found");
            return 
        }

        res.json(post);
    },
    create: async (req: Request, res: Response) => { 
        const body = req.body;
    
        if (!body) {
            res.status(422).json("Body is required.");
            return 
        }
        if (!body.title) {
            res.status(422).json("title is required.");
            return 
        }
        if (!body.description) {
            res.status(422).json("description is required.");
            return 
        }
        if (!body.image) {
            res.status(422).json("image is required.");
            return 
        }
    
        try {
            const post = await PostService.create(body);
            res.status(201).json(post);
        } catch (error) {
            console.error(error);
            res.status(500).json("Post creation error");
        }
    },   
    update :async (req: Request, res: Response) => {
        const id = req.params.id
        if (!id){
            res.status(400).json("id is required");
            return
        }
        if (isNaN(+id)){
            res.status(400).json("id must be an integer");
            return;
        }
        const body = req.body
        if (body.id){
            res.status(422).json("body must not consist id");
            return
        }
        const post = await PostService.update(+id, body)
        if (!post) {
            res.status(500).json("Post creation error")
            return
        }
        res.status(200).json(post)
        
    },
}




exports = {PostController}


