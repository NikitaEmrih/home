const fs = require('fs');
const path = require('path');
const fsPromises = require("fs/promises")


const postsPath = path.join(__dirname, "array.json")
const posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"))


const PostService = {
    getAll(skip, take) {
        let result = posts;
        if (skip) {
            result = result.slice(+skip);
        }
        if (take) {
            result = result.slice(0, +take);
        }
        return result;
    },
    getById(id) {
        return posts.find(po => po.id === id);
    },
    async create (data){
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
    }
}
module.exports = PostService