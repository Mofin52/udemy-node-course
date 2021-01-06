// serve two HTML files at routes `/` and `users`

// add static css files for html files
const express = require("express");
const routes = require("./routes");
const app = express();

app.use(routes);

app.listen(3000);
