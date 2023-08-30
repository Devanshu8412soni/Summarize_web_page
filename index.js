const cheerio = require("cheerio");
const axios = require("axios");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.post("/getresponse", async (req, res) => {
  try {
    const { url } = req.query;
    const resp = await axios.get(url);
    if (resp.status === 200) {
      const { data } = resp;
      console.log(data);
      const $ = cheerio.load(data);

      //Extract text form <p> tags
      const pTagsText = $("p")
        .map((index, element) => $(element).text())
        .get();

      // Extract text from <h1> to <h6> tags
      const hTagsText = $("h1, h2, h3, h4, h5, h6")
        .map((index, element) => $(element).text())
        .get();

      // Extract text from <a> tags
      const aTags = $("a")
        .map((index, element) => $(element).text())
        .get();

      // Combine all the extracted text into a single array
      const allText = [...pTagsText, ...hTagsText, ...aTags];

      const resultedText = allText.join(' ');
      const responseText = resultedText.substring(0,3000);

      res.json({responseText});
      // let p = $("p").text();

      // console.log(p);

      // p = p.substring(0, 3000);
      // res.json(p);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
