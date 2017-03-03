// const hostname = '192.168.1.73';
const port = 80;

var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();


app.use('/api', proxy({ target: 'http://note.wiz.cn', changeOrigin: true }));
app.use('/wizas', proxy({ target: 'http://note.wiz.cn', changeOrigin: true }));


app.use(express.static(__dirname + '/../../page_src'));
console.log('Web Path: ' + __dirname + '/../../page_src');

app.listen(port, function () {
    // console.log(`Server running at http://${hostname}:${port}/`);
});