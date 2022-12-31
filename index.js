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
    // dla dockera, taka wersja musi być w kodzie faktycznym
    const response = await fetch("http://spring:8080/meal/all")
    // dla locala
    // const response = await fetch("http://localhost:8080/meal/all")
    const myjson = JSON.parse(await response.text())
    // cały JSON
    // console.log(myjson)
    // jeden element z JSONa
    // console.log(myjson[0])
    // składniki konkretnego dania
    console.log(myjson[0]["mealIngredients"])
}
meal()
