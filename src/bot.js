'use strict';

const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
require('dotenv').config();

const { FONTS, PANGRAM } = require('./text.js');
const { changeFont } = require('./changeFont.js');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.catch((err) => {
    console.log(err);
});

let font = FONTS[0];

function getAllCommandText() {
    let text = 'Команды выбора шрифта:\n\n';
    for (let i = 0; i < FONTS.length; ++i) {
        text += `/russian${i + 1} — ${changeFont(PANGRAM, FONTS[i])}\n`;
    }
    return text;
}

bot.start(async (ctx) => {
    let name = ctx.message.from.username || ctx.message.from.id;
    await ctx.replyWithHTML(`\uD83D\uDCEC Здравствуйте, ${name}. Отправьте текст для преобразования.`);
});

bot.command('help', async (ctx) => {
    await ctx.reply(getAllCommandText());
});

const regex = new RegExp(`/russian[1-${FONTS.length}]`);

bot.hears(regex, async (ctx) => {
    font = FONTS[ctx.message.text.slice(8, 9) - 1];
    await ctx.reply(`Шрифт успешно изменён. Пример текста:\n\n${changeFont(PANGRAM, font)}`);
});

bot.on(message('text'), async (ctx) => {
    if (ctx.message.text.length > 4095) {
        await ctx.reply('\u2757Ваше сообщение слишком большое! Сократите его и отправьте повторно.');
    }
    else {
        await ctx.replyWithHTML(`Нажмите на текст, чтобы скопировать его.\n\n<code>${changeFont(ctx.message.text, font)}</code>`);
    }

});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
