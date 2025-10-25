import { Request, Response } from "express"
import { PostService } from "./post.service"
import { PostControllerContract } from "./post.types"

export const PostController: PostControllerContract = {
    getAll: (req, res) => { 
        console.log(req.query)
        const { skip, take } = req.query

        if (skip && isNaN(+skip)) {
            res.status(400).json("skip must be a number")
            return
        }
        if (take && isNaN(+take)) {      
            res.status(400).json("take must be a number")
            return
        }

        if (skip || take) {
            const slicedPosts = PostService.getAll(
                skip ? +skip : undefined,
                take ? +take : undefined
            )
            res.status(200).json(slicedPosts)
            return
        }

        const posts = PostService.getAll()
        res.status(200).json(posts)
    },

    getById: (req: Request, res: Response) => {
        if (!req.params.id) {
            res.status(400).json("id is required")
            return
        }
        const id = +req.params.id
        console.log(id)
        if (isNaN(id)) {
            res.status(400).json("id must be an integer")
            return
        }

        const post = PostService.getById(id)
        if (!post) {
            res.status(404).json("post not found")
            return
        }

        res.json(post)
    },

    create: async (req, res) => {
        console.log(req.body)
        const body = req.body
        if (!body) {
            res.status(422).json("Body is required.")
            return
        }
        if (!body.title) {
            res.status(422).json("title is required.")
            return
        }
        if (!body.description) {
            res.status(422).json("description is required.")
            return
        }
        if (!body.image) {
            res.status(422).json("image is required.")
            return
        }
        
        const post = await PostService.create(body)
        if (!post) {
            res.status(500).json("Post creation error")
            return
        }
        res.status(201).json(post)
    },

    async update(req, res) {
        const id = req.params.id
        if (!id) {
            res.status(400).json("id is required")
            return
        }
        if (isNaN(+id)) {
            res.status(400).json("id must be an integer")
            return
        }
        const body = req.body
        if ("id" in body) {
            res.status(422).json("body must not consist id")
            return
        }
        const post = await PostService.update(+id, body)
        if (!post) {
            res.status(500).json("Post update error")
            return
        }
        res.status(200).json(post)
    },
}
