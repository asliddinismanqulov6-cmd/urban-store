require('dotenv').config();const TelegramBot = require('node-telegram-bot-api');


const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN, {
    polling: true
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId,
    '🛍 URBAN STORE ga xush kelibsiz!',
    {
      reply_markup: {
        keyboard: [
          ['👕 Erkaklar', '👗 Ayollar'],
          ['🛒 Mahsulotlar', '📞 Aloqa']
        ],
        resize_keyboard: true
      }
    }
  );
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '👕 Erkaklar') {
    bot.sendMessage(chatId, 'Erkaklar kiyimlari tez orada!');
  }

  if (text === '👗 Ayollar') {
    bot.sendMessage(chatId, 'Ayollar kiyimlari tez orada!');
  }

  if (text === '🛒 Mahsulotlar') {
    bot.sendMessage(chatId, 'Mahsulotlar katalogi tez orada!');
  }

  if (text === '📞 Aloqa') {
    bot.sendMessage(chatId, 'URBAN STORE bilan bog‘laning.');
  }
});

console.log('URBAN STORE BOT ishga tushdi!');