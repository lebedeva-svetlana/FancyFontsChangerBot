const { RUSSIAN } = require('./text.js');

module.exports.changeFont = function (text, font) {
    let changedText = '';
    for (let i = 0; i < text.length; ++i) {
        if (!RUSSIAN.includes(text[i].toLowerCase())) {
            changedText += text[i];
        } else {
            let isLower = text[i] === text[i].toLowerCase();
            for (let j = 0; j < RUSSIAN.length; ++j) {
                if (text[i].toLowerCase() === RUSSIAN[j]) {
                    if (isLower) {
                        changedText += font.lowercase[j];
                    } else {
                        if ('uppercase' in font) {
                            changedText += font.uppercase[j];
                        } else {
                            changedText += font.lowercase[j];
                        }
                    }
                }
            }
        }
    }
    return changedText;
}