let express = require("express");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);
var cors = require("cors");

let stream = require("./src/ws/stream");
let path = require("path");
const dotenv = require("dotenv");

// let favicon = require("./src/favicon-serve");

dotenv.config({ path: "./config/config.env" });

app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(express.json());

// app.use(favicon(path.join(__dirname, "./src/favicon.ico")));
app.use("/assets", express.static(path.join(__dirname, "/src/assets")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});
var Link;
app.post("/getLink", (req, res) => {
  console.log("Inside Route GetLInk");
  console.log(req.body.link);
  Link = req.body.link;
  res.json({ ok: "OK" });
});

app.get("/link", (req, res) => {
  res.json({ Link });
});

io.of("/stream").on("connection", stream);

const PORT = process.env.PORT || 7000;
server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
