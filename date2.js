const express = require('express');
const moment = require('moment'); 
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8000;
const HOST = 'localhost'


const arrayPath = path.join(__dirname, "array.json")
const array = JSON.parse(fs.readFileSync(arrayPath, "utf-8"))


app.get('/posts', (req, res) => {
    res.status(200).json(array);
});


app.listen(PORT, HOST , () => {
    console.log(`http://${HOST}:${PORT}`);
});
