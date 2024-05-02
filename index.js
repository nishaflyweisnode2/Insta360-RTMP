const express = require("express");
const NodeMediaServer = require("node-media-server");

const app = express();

// Express routes
app.get("/", (req, res) => {
  res.send("Hello, this is your Express server!");
});

// RTMP server configuration
const config = {
  rtmp: {
    port: 1936,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30,
  },
  http: {
    port: 8000,
    allow_origin: "*",
  },
};

// Initialize the NodeMediaServer
const nms = new NodeMediaServer(config);

// Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});

// Start RTMP server
nms.on("ready", () => {
  console.log("RTMP Server is running");
});

nms.on("error", (err) => {
  console.error("RTMP Server failed:", err);
});

nms.run();
