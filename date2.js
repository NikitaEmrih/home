const express = require('express');
const moment = require('moment'); 
const fs = require('fs');
const path = require('path');
const fsPromises = require("fs/promises")

const app = express();
const PORT = 8000;
const HOST = 'localhost'
app.use(express.json())


const arrayPath = path.join(__dirname, "array.json")
const posts = JSON.parse(fs.readFileSync(arrayPath, "utf-8"))


function timestamp() {
    return moment().format('YYYY-MM-DD HH:mm:ss'); 
}


app.get('/timestamp', (req, res) => {
    res.json({ timestamp: timestamp() });
});


app.post("/posts", async (req, res) => {
    const body = req.body;
    console.log("POST body:", body);

    if (!body) {
        res.status(422).json("Body is required.");
        return;
    }

    const newPost = { ...body, id: posts.length + 1 };

    if (!newPost.title) {
        res.status(422).json("title is required.");
        return;
    }
    if (!newPost.description) {
        res.status(422).json("description is required.");
        return;
    }
    if (!newPost.image) {
        res.status(422).json("image is required.");
        return;
    }

    try {
        posts.push(newPost);
        await fsPromises.writeFile(arrayPath, JSON.stringify(posts, null, 4)); 
        console.log("Created:", newPost);
        res.status(201).json(newPost); 
    } catch (error) {
        console.error(error);
        res.status(500).json("Post creation error");
    }
});



app.get("/posts", (req, res) => {
    console.log(req.query)
    const skip = req.query.skip
    const take = req.query.take

    if (skip) {
        if (isNaN(+skip)) {
            res.status(400).json("skip is not a number")
            return;
        }
    }

    if (take) {
        if (isNaN(+take)) {
            res.status(400).json("take is not a number")
            return;
        }
    }
    if (skip) {
        const skippPosts = posts.slice(+skip)
        res.status(200).json(skippPosts)
        return;
    }
    if (take) {
        const takePosts = posts.slice(0, +take)
        res.status(200).json(takePosts)
        return;
    }
    res.status(200).json(posts)
})


app.get("/posts/:id", (req, res) => {
    const id = +req.params.id;
    console.log(id);

    if (isNaN(id)) {
        res.status(400).json("id must be a number");
        return;
    }

    const post = posts.find((pr) => pr.id === id);

    if (!post) {
        res.status(404).json("post not found");
        return;
    }

    res.json(post);
});


app.listen(PORT, HOST , () => {
    console.log(`http://${HOST}:${PORT}`);
});
