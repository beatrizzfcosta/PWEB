//server.js

const app = require("./app");
const connectDB = require('./database/database')
const port = process.env.PORT || 15000;

const runServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log("+===========================================+");
      console.log(
        "|\x1b[32m   Server is up and running on port",
        port,
        "\x1b[0m |"
      );
      console.log("+===========================================+");
    });
  } catch (error) {
    console.error("Server error:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

runServer();