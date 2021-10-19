// main.js Example
const server = require(`./server.js`);

(function() {
    console.log(`call server start`)
    server.start({
        port: 12345
    });
})();