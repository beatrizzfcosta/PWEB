//server.js


const app = require("./app");
const connectDB = require('./database/database')
const port = 15000;

const runServer = async () => {

  await connectDB();

  app.listen(port, () => {
    console.log("+===========================================+");
    console.log("|\x1b[32m   Server is up and running on port", port, "\x1b[0m |");
    console.log("+===========================================+");
  });

};

runServer().catch(error => {
  console.error('Server error:', error);
});



