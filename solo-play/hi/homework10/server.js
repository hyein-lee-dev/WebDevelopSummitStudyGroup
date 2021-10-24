const express = require('express');
const app = express();

var userRouter = require(`./routes/members`);

app.use(express.static(__dirname + `/public`));
app.use(`/member`, userRouter);

app.get(`/`, function(req, res) {
    console.log(`hello`);
    res.status(200).sendFile(__dirname + `/public/index.html`)
});

function start(info) {
    app.listen(info.port, function() {
        console.log(`Server listens on port number ${info.port}`);
    });
}

exports.start = start;
