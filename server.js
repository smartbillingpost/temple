const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files (HTML, audio etc.)
app.use(express.static(__dirname));

// ✅ Endpoint to get audio files
app.get("/audio-list", (req, res) => {
  const audioDir = path.join(__dirname, "audio");

  fs.readdir(audioDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read audio folder" });
    }

    const mp3Files = files.filter(file => file.endsWith(".mp3"));

    res.json(mp3Files);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});