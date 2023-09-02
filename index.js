const cheerio = require("cheerio");
const axios = require("axios");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;

app.use(cors());

/*Handles HTTP GET requests to the root path ("/").
 Responds with a simple "Hello, Express!" message when accessed. */
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

/* Handles HTTP POST requests to the "/getresponse" endpoint.
   Retrieves the content from a specified URL, extracts text from HTML tags (h1-h6, p), and sends a JSON response. */

app.post("/getresponse", async (req, res) => {
  try {
    // Extract the URL from the query parameters
    const { url } = req.query;
    // Send an HTTP GET request to the specified URL
    const resp = await axios.get(url);
    // Check if the request was successful (status code 200)
    if (resp.status === 200) {
      const { data } = resp;
      console.log(data);
      // Parse the HTML content using Cheerio
      const $ = cheerio.load(data);

      //Extract text from different HTML tags (h1-h6, p)
      const imageText = $("img").text();
      const spanText  = $("span").text();
      // const h1Tags = $("h1").text();
      // const h2Tags = $("h2").text();
      // const h3Tags = $("h3").text();
      // const h4Tags = $("h4").text();
      // const h5Tags = $("h5").text();
      // const h6Tags = $("h6").text();
      // const pTags = $("p").text();
      
      //Combine and truncate the extracted text (up to 3000 characters)
      // let result = pTags + "\n" + h1Tags + "\n" + h2Tags + "\n" + h3Tags + "\n" + h4Tags + "\n" + h5Tags + "\n" + h6Tags;
      // result = result.substring(0,3000);

      let result = imageText + "\n"+ spanText;
      result = result.substring(0,3000);
      // Send the extracted text as a JSON response
      res.json(result); 
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
