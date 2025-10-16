import express from 'express'
import { PostRouter } from './Post/post.routes'

const app: express.Express = express()
const PORT: number = 8000;
const HOST: string = 'localhost'
app.use(PostRouter)




// function timestamp() {
//     return moment().format('YYYY-MM-DD HH:mm:ss'); 
// }


// app.get('/timestamp', (req, res) => {
//     res.json({ timestamp: timestamp() });
// });




app.listen(PORT, HOST , () => {
    console.log(`http://${HOST}:${PORT}`);
});
