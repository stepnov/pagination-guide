const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));
app.get('/list', async (req, res) => {
  try{
    let result = await axios.get("http://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&appid=476787c5ccaf8b0949ff8b5bc02cdecc");
    res.json(result.data);
  } catch(e) {
    console.log(e);
  }
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
