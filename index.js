const express = require('express');
const axios = require('axios');
const PORT = 5001;

const app = express();

app.get('/', (req,res) => {
  res.send('<code>Online. <br><br> For list of commands, go to <a style="decoration:none; color:black" href="/help">/help</a></code>');
})

app.get('/help', (req,res) => {
  const helpData = {
    "toss": "Outputs Heads / Tails",
    "random": "Outputs 0 / 2",
    "random/<limit>": "Outputs a number between 0 and limit parameter",
    "chuck": "Outputs a Chuck Norris joke",
    "bored": "Random activiy",
    "btc": "Realtime Bitcoin rate"
  }
  res.json(helpData);
})

app.get('/toss', (req, res) => {
  const num = Math.round(Math.random());
  res.json(num == 0 ? 'Heads' : 'Tails');
})

app.get('/random/', (req, res) => {
  const num = Math.round(Math.random() * req.params['limit']);
  res.json(num);
})

app.get('/random/:limit', (req, res) => {
  const num = Math.round(Math.random() * req.params['limit']);
  res.json(num);
})

app.get('/chuck', (req, res) => {
  axios.get('https://api.chucknorris.io/jokes/random')
    .then(response => {
      res.end(response.data.value);
    }).catch(error => {
      res.json(error)
    })
})

app.get('/bored', (req, res) => {
  axios.get('https://www.boredapi.com/api/activity')
    .then(response => {
      res.end(response.data.activity);
    }).catch(error => {
      res.json(error)
    })
})

app.get('/btc', async (req, res) =>  {
  let resp;
  await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
  .then(response => {
    resp = response.data;
  }).catch(error => {
    res.json(error)
  })
  const data = {
    "Cryptocurrency Name": "Bitcoin",
    "Current Rate" : {
      "USD $" : Number.parseInt((resp.bpi.USD.rate).replace(',','')),
      "GBP £" : Number.parseInt((resp.bpi.GBP.rate).replace(',','')),
      "EUR €" : Number.parseInt((resp.bpi.EUR.rate).replace(',','')),
      "INR ₹" : Number.parseInt((resp.bpi.USD.rate).replace(',','')) * 75
    }
  }
  res.json(data);
})



app.listen(PORT, () => {
  console.log('Listening On Port ' + PORT);
})