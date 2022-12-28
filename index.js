import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import fetch from "node-fetch";

const app = express();
const port = 8081;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__dirname)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log('${port}');
})

const delay = ms => new Promise(res => setTimeout(res, ms));

const meal = async () => {
    await delay(5000)
    const response = await fetch("http://localhost:8080/meal/all")
    let myjson = response.json()
    myjson.then(function (zupa) {
        console.log(zupa)
    })
}
console.log(meal())
