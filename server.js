const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Video Downloader API is running");
});

app.get("/download", async (req, res) => {
  const videoURL = req.query.url;
  if (!ytdl.validateURL(videoURL)) {
    return res.status(400).send("Invalid URL");
  }

  const info = await ytdl.getInfo(videoURL);
  const format = ytdl.chooseFormat(info.formats, { quality: "highest" });

  res.setHeader("Content-Disposition", `attachment; filename="video.mp4"`);
  ytdl(videoURL, { format }).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
