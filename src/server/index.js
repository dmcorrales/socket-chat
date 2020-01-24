const express = require("express");
const app = express();
const path = require("path");
const publicPath = path.resolve(__dirname, '../../public');
const SocketIO  = require("socket.io");
const http = require("http"); // Default's node http
require("./configurations");

let server = http.createServer(app);

// IO = Backend communication
module.exports.io = SocketIO(server);
require("./sockets/socket");
app.use(express.static(publicPath));



server.listen(process.env.PORT, () => {
    console.log(`Server started at port: ${process.env.PORT}`);
})