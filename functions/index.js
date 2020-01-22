const functions = require('firebase-functions');
const Telegraf = require('telegraf')
const axios = require('axios');

let config = require('./environment.json');

if (Object.keys(functions.config()).length) {
  config = functions.config();
}
const params = {
  access_key: config.service.access_key,
  query: 'London'
}
exports.helloWorld = functions.https.onRequest((request, response) => {
    axios.get('http://api.weatherstack.com/current', {params})
      .then((current) => {
        const apiResponse = current.data;
        console.log(current.data);
        return response.send(apiResponse);
      }).catch((error) => {
        console.log(error);
      });
    }); 

    const bot = new Telegraf(config.service.telegram_key)
bot.start((ctx) => ctx.reply('Welcome'))
bot.on('text', (ctx) =>{
  params.query = ctx.update.message.text;
    axios.get('http://api.weatherstack.com/current', {params})
      .then((current) => {
        const info=current.data;
        return ctx.reply('Current temperature in ' +info.request.query+ ' is ' +info.current.temperature+ '°C with wind speed of ' + info.current.wind_speed+ ' and humidity level is of '+info.current.humidity+ ' .' );
      }).catch((error) => {
        return ctx.reply('City does not exist. Try another name!');
      });
})
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch();



 



