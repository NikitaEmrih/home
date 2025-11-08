import { TagControllerContract } from "./tag.types"
import { TagService } from "./tag.service";

export const TagController: TagControllerContract = {
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
                const slicedPosts =  await TagService.getAll(+take)
                res.status(200).json(slicedPosts)
                return;
            }

            if (skip) {
                if (isNaN(+skip)){      
                    res.status(400).json("skip is not a number")
                    return;
                }
                const skippedPosts =  await TagService.getAll(undefined, +skip)
                res.status(200).json(skippedPosts)
                return;
            }

            const posts = await TagService.getAll()
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
            const post = await TagService.getById(id)
            
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
}
