const functions = require('firebase-functions');
const Telegraf = require('telegraf')
const apixu = require('apixu');
const apixuClient = new apixu.Apixu({
    apikey: '--'
})

const bot = new Telegraf('--')
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 apixuClient.current('London').then((current)=>{
    return response.send(current);
 }).catch((err)=>{
     return response.send(err);
 })
});
