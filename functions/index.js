
const functions = require('firebase-functions');
const Telegraf = require('telegraf')
const axios = require('axios');
const params = {
  access_key: '--',
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

    const bot = new Telegraf('--')
bot.start((ctx) => ctx.reply('Welcome'))
bot.on('text', (ctx) =>{
   params.query = ctx.update.message.text;
    axios.get('http://api.weatherstack.com/current', {params})
      .then((current) => {
        return ctx.reply('Current weather in ${params.query} is C: ${current.current.temperature}')
      }).catch((error) => {
        return ctx.reply('City does not exist. Try another name!');
      });
})
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch();

/*const apixu = require('apixu');
const apixuClient = new apixu.Apixu({
    apikey: '--'
})*/
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
/*exports.helloWorld = functions.https.onRequest((request, response) => {
 apixuClient.current('London').then((current)=>{
    return response.send(current);
 }).catch((err)=>{
     return response.send(err);
 })
});*/

 

