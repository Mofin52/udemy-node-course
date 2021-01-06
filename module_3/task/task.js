// port 3000
// route '/' -> greeting
// -> form with 'username' -> /create-user
// -> parse incoming data and console.log it
// -> redirect to /
// route '/users' -> ul-li list

const http = require("http");
const router = require("./routes");
const server = http.createServer(router);
server.listen(3000);
