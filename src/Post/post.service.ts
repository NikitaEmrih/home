import fs from "fs";
import path from "path";
import fsPromises from "fs/promises";
import { Post, CreatePostData, UpdatePostData } from './post.types'


const postsPath = path.join(__dirname, "array.json")
const posts: Post[] = JSON.parse(fs.readFileSync(postsPath, "utf-8"))
export const PostService = {
    
    getAll(skip?: number, take?: number) {
        let result = posts;
        if (skip) {
            result = result.slice(+skip);
        }
        if (take) {
            result = result.slice(0, +take);
        }
        return result;
    },
    getById(id: number) {
        return posts.find(po => po.id === id);
    },
    async create (data:CreatePostData ){
        try{
            const newPost = { ...data, id: posts.length + 1 }
            posts.push(newPost) 
            await fsPromises.writeFile(postsPath, JSON.stringify(posts, null, 4)) 
            console.log(newPost) 
            return newPost
        
        } catch (error){
            console.log(error)
            return null
        }
    },
    async update(id: number, data:UpdatePostData){
        const post = this.getById(id)
        if (!post) {
            return null
        }

        try {   
            const updatedPost = { ...post, ...data }
            posts.splice(id - 1, 1, updatedPost)
            await fsPromises.writeFile(postsPath, JSON.stringify(posts, null, 4))
            return updatedPost
        } catch (error) {
            console.log(error)
            return null
        }
    },
}




