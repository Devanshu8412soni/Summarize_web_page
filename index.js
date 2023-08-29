const cheerio = require("cheerio");
const axios = require("axios");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;

app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello, Express!');
  });

  app.post('/getresponse',async(req,res)=>{
    try {
        const {url}  = req.query;
        const {data} = await axios.get(url);
        // console.log(data);
        const $ = cheerio.load(data);
        let p = $("p").text()
        console.log(p);
        p = p.substring(0,200);
       
        res.json(p)
    } catch (error) {
        console.log(error);
    }
  })
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });


const fetchData = async ()=>{
  try {
    const {data} = await axios.get('https://www.wikipedia.org');
    // console.log(data);
    const $ = cheerio.load(data);
    const p = $("h1").text()
    return p;
  } catch (error) {
    console.log(error);
  }
}

  