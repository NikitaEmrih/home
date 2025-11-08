import { Request, Response } from "express"
import { PostService } from "./post.service"
import { PostControllerContract } from "./post.types"

export const PostController: PostControllerContract = {
    getAll: async (req, res)=>{ 
        try {
            console.log(req.query)
            const take = req.query.take 
            const skip = req.query.skip 

            if (take) {
                if (isNaN(+take)){      
                    res.status(400).json("take is not a number")
                    return;
                }
                const slicedPosts =  await PostService.getAll(+take)
                res.status(200).json(slicedPosts)
                return;
            }

            if (skip) {
                if (isNaN(+skip)){      
                    res.status(400).json("skip is not a number")
                    return;
                }
                const skippedPosts =  await PostService.getAll(undefined, +skip)
                res.status(200).json(skippedPosts)
                return;
            }

            const posts = await PostService.getAll()
            res.status(200).json(posts)
            
        } catch (error) {
            console.log(error)
            res.status(500).json('unhandled error')
        }
    },

    getById: async(req, res)=>{
        try {
            if (!req.params.id){
                res.status(400).json("id is required");
                return
            }
            const id = +req.params.id
            console.log(id)
            if (isNaN(id)){
                res.status(400).json("id must be an integer");
                return;
            }
            const post = await PostService.getById(id)
            
            if (!post){
                res.status(404).json("post not found")
                return;
            }
            
            res.json(post)
            
        } catch (error) {
            console.log(error)
            res.status(500).json('unhandled error')
        }
    },

    create: async (req, res) => {
        try {
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
        } catch (error) {
            console.log(error)
            res.status(500).json('unhandled error')
        }
    },

    async update(req, res) {
        try {
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
            if ("id" in body){
                res.status(422).json("body must not consist id");
                return
            }
            const post = await PostService.update(+id, body)
            if (!post) {
                res.status(500).json("Post update error")
                return
            }
        } catch (error) {
            console.log(error)
            res.status(500).json('unhandled error')
        }
        
    },
}
