const { read } = require("fs");

const routeHandler = (req, res) => {
  const { url, method } = req;

  if (url === "/") {
    res.setHeader("Content-type", "text/html");
    res.write("<h3>Greetings!</h3>");
    res.write(
      "<p>Check out our users list <a href='/users'>on this page</a></p>"
    );
    res.write("<h3>Create a new one</h3>");
    res.write("<form action='/create-user' method='POST'>");
    res.write("<input name='username' type='text'>");
    res.write("<button type='submit'>Create</button>");
    res.write("</form>");
    return res.end();
  }

  if (url === "/users") {
    res.setHeader("Content-type", "text/html");
    res.write("<ul>");
    res.write("<li>Adam Lee</li>");
    res.write("<li>Megan Sleeves</li>");
    res.write("<li>Harry Potter</li>");
    res.write("</ul>");
    res.write("<p>Back to <a href='/'>main page</a></p>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => body.push(chunk));
    return req.on("end", () => {
      const parsedData = Buffer.concat(body).toString().split("=")[1];
      console.log(`User ${parsedData} created`);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }

  res.write("<h1>404 - Page not found</h1>");
  return res.end();
};

module.exports = routeHandler;
