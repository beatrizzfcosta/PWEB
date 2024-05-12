//server.js

const app = require("./app");
const port = 15000;

app.listen(port, () => {
  console.log("+===========================================+");
  console.log("|\x1b[32m   Server is up and running on port", port, "\x1b[0m |");
  console.log("+===========================================+");
});
