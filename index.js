import express from "express";
import router from "./routes/routes.js";
import cors from "cors"
import { Server } from "socket.io";
import { createServer } from "http";

const app = express()
const port = 3001
app.use(express.json());
app.use(cors())

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // React frontend URL
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("send_message", (data, userId) => {
        console.log("send_message event in backend Data: ", data)
        ///
        io.emit("receive_message", data, userId);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

//routing
app.use("/api", router);

server.listen(port, (error) => {
    if (error) {
        console.log("Error running the server");
    }
    console.log("Server is starting at port: ", port)
})