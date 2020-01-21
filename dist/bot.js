"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_ai_1 = require("botbuilder-ai");
const parser_1 = require("./parser");
const card_1 = require("./card");
class echobot {
    onTurn(context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (context.activity.type === 'message') {
                context.sendActivity(`Nav said ${context.activity.text}`);
            }
            else {
                context.sendActivity(`event deletected ${context.activity.type}`);
            }
        });
    }
}
exports.echobot = echobot;
class confbot {
    constructor(qnamaker, luis) {
        this._qnamaker = qnamaker;
        this._luis = luis;
    }
    onTurn(context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (context.activity.type === 'message') {
                var rslt = yield this._qnamaker.generateAnswer(context.activity.text);
                yield this._luis.recognize(context).then(rsl => {
                    const top = botbuilder_ai_1.LuisRecognizer.topIntent(rsl);
                    let data = parser_1.getData(rsl.entities);
                    if (top === 'Time') {
                    }
                    else if (data.length > 1) {
                        context.sendActivity(card_1.createCarousel(data, top));
                    }
                    else if (data.length === 1) {
                        context.sendActivity({
                            attachments: [card_1.createHeroCard(data[0], top)]
                        });
                    }
                });
            }
        });
    }
}
exports.confbot = confbot;
//# sourceMappingURL=bot.js.map