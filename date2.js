const express = require('express');
const moment = require('moment'); 

const app = express();
const PORT = 8000;
const HOST = 'localhost'


function Timestamp() {
    return moment().format('YYYY-MM-DD HH:mm:ss'); 
}


app.get('/timestamp', (req, res) => {
    res.json({ timestamp: Timestamp() });
});


app.listen(PORT, HOST , () => {
    console.log(`http://${HOST}:${PORT}`);
});
