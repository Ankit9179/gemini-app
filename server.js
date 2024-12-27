import http from "http";
import app from "./app.js";
const PORT = process.env.PORT | 8080;

//create server
const server = http.createServer(app);

// listening server
server.listen(PORT, () => {
  console.log("server is running on port 8080");
});
