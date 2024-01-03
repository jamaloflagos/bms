require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const corsOptions = require("./config/corsOption");
const ConnectDB = require("./config/dbConnect");
const { logger, logEvents } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 3500;

ConnectDB()

app.use(logger)

app.use(cors(corsOptions));

app.use(express.json());

app.use("/", require("./routes/root"));
app.use("/user", require("./routes/authRoutes"));
app.use("/book", require("./routes/apis/bookRoutes"));
app.use("/author", require("./routes/apis/authorRoutes"));
app.use("/publisher", require("./routes/apis/publisherRoutes")); 

app.all("*", (req, res) => {
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"))
    } else if (req.accepts("json")) {
        res.json({message: "404 Not Found"})
    } else {
        res.type("txt").send("404 Not Found")
    }
})

app.use(errorHandler)

mongoose.connection.once("open", () => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`connected to database and listening on port ${process.env.PORT}`));
});

mongoose.connection.on("error", err => {
    logEvents(`${err.name}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErr.log")
    console.log(err);
});