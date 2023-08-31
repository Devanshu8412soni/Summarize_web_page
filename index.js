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
      const h1Tags = $("h1").text();
      const h2Tags = $("h2").text();
      const h3Tags = $("h3").text();
      const h4Tags = $("h4").text();
      const h5Tags = $("h5").text();
      const h6Tags = $("h6").text();
      const pTags = $("p").text();

      let result = h1Tags + "\n" + h2Tags + "\n" + h3Tags + "\n" + h4Tags + "\n" + h5Tags + "\n" + h6Tags + "\n" + pTags;
      result = result.substring(0,3000);
      res.json(result); 

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
