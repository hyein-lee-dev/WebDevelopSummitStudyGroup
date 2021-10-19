const http = require(`http`);
const fs = require(`fs`);
const path = require(`path`);

function onRequest(request, response) {
    request.on('error', (err) => {
        console.error(err);
        response.statusCode = 400;
        response.end();
    });
    response.on('error', (err) => {
        console.error(err);
    });

    if(request.url === "/"){
        console.log("server received request '/'")
        let mainPath = path.resolve('static','index.html');
        makeResponseForFile(mainPath, response);
    } else {
        console.log(`request url = ${request.url}`)
        let filePath = path.join(path.resolve(),'static', request.url);
        makeResponseForFile(filePath, response);
    };
}

function makeResponseForFile(filePath, response) {
    fs.readFile(filePath, 'utf-8', (err, result) => {
        if(err){
            console.log(`file read error for ${filePath} : \n` + err.message);
            response.statusCode = 500;
            response.end();
        }
        contentType = getContentType(filePath)
        response.writeHead(200, contentType);
        response.end(result);
    });
}

function getContentType(_url){
    let url = _url.toLowerCase();
    if(url.match("\.html$")) {
        return {'Content-Type':'text/html; charset=utf-8'};
    } else if(url.match("\.css$")) {
        return {'Content-Type':'text/css; charset=utf-8'};
    } else if(url.match("\.js$")) {
        return {'Content-Type':'text/javascript; charset=utf-8'};
    }
}

function start(info) {
    http.createServer(onRequest).listen(info.port, function() {
        console.log(`Server listens on port number ${info.port}`);
    });
}

exports.start = start;
