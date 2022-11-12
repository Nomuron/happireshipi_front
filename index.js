const express = require('express');
const app = express();
const port = 8081;

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

app.listen(port, () => {
    console.log('${port}');
})