const express = require('express');
const moment = require('moment'); 
const PostRouter = require('./Post/post.routes')

const app = express();
const PORT = 8000;
const HOST = 'localhost'
app.use(express.json())
app.use(PostRouter)




function timestamp() {
    return moment().format('YYYY-MM-DD HH:mm:ss'); 
}


app.get('/timestamp', (req, res) => {
    res.json({ timestamp: timestamp() });
});




app.listen(PORT, HOST , () => {
    console.log(`http://${HOST}:${PORT}`);
});
