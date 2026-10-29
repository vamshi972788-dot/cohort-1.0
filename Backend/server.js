
import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import http from "http";

import { initSocket } from "./src/sockets/server.sockets.js";

const httpServer = http.createServer(app);

initSocket(httpServer);

connectDB();

httpServer.listen(3000, () => {
    console.log("server is running port number 3000");
}); 