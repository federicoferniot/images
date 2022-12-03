const express = require("express");
const app = express();
const fs = require('fs');
var cors = require('cors')
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
var path = require('path');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const imagesPath = path.join(__dirname, 'images')

class img {
    constructor(name, content) {
        this.name = name;
        this.content = content;
    }
}

app.get('/', function (req, res) {
    res.send('Saludos desde express');
});

app.get('/folders', function (req, res) {
    var names = [];
 
    fs.readdir(imagesPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            names.push(file);
        });
        res.send(names)
    });
});

app.get('/images', function (req, res) {
    let folder = req.query.folder;
    var filesNames = [];
    folder = path.join(imagesPath, folder);
    fs.readdir(folder, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            filesNames.push(new img(file, base64_encode(path.join(folder, file))));
        });
        res.send(filesNames)
    });
});

function base64_encode(file) {
    return "data:image/gif;base64," + fs.readFileSync(file, 'base64');
}

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});