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
const bot_1 = require("./bot");
const botbuilder_1 = require("botbuilder");
const restify = require("restify");
const botbuilder_ai_1 = require("botbuilder-ai");
const dotenv_1 = require("dotenv");
const path = require("path");
const ENV_FILE = path.join(__dirname, '.env');
dotenv_1.config({ path: ENV_FILE });
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`${server.name} listening to ${server.url}`);
});
const adapter = new botbuilder_1.BotFrameworkAdapter({
    appId: "9092596b-6fc1-4969-8570-6a68a46b8817",
    appPassword: "AckC9>WB2rP%-c-CJgt;r*MF[bd2"
});
var qnamaker = new botbuilder_ai_1.QnAMaker({
    knowledgeBaseId: "6589376d-5941-4145-8e91-e85b1a576d0c",
    endpointKey: "04141649-6eaa-4be5-a189-ba1cdcc1d696",
    host: "https://firstqnass.azurewebsites.net/qnamaker",
});
var luis = new botbuilder_ai_1.LuisRecognizer({
    applicationId: "61a3745c-46e1-4257-bc14-82f39d4b2e8e",
    endpointKey: "5609cc76659044ab9723db77c5b8ebbb",
    endpoint: process.env.SECRET
});
const echo = new bot_1.confbot(qnamaker, luis);
server.post('/api/message', (req, res) => {
    adapter.processActivity(req, res, (context) => __awaiter(void 0, void 0, void 0, function* () {
        yield echo.onTurn(context);
    })).catch(err => {
        console.log('error ', err);
    });
});
//# sourceMappingURL=app.js.map