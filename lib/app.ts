import { echobot, confbot } from './bot';
import {BotFrameworkAdapter} from 'botbuilder';
import * as restify from 'restify';
import { QnAMaker,LuisRecognizer } from 'botbuilder-ai';
import {config} from 'dotenv';
import * as path from 'path';

const ENV_FILE = path.join(__dirname, '.env');
config({path:ENV_FILE})

let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`${server.name} listening to ${server.url}`);
});

// Create adapter
// const adapter = new BotFrameworkAdapter({ 
//     appId: process.env.MICROSOFT_APP_ID, 
//     appPassword: process.env.MICROSOFT_APP_PASSWORD 
// });
// var qnamaker = new QnAMaker({
//     knowledgeBaseId:<string>process.env.QnAKnowledgebaseId,
//     endpointKey:<string>process.env.QnAAuthKey,
//     host:<string>process.env.QnAEndpointHostName,
// });

const adapter = new BotFrameworkAdapter({ 
    appId: "9092596b-6fc1-4969-8570-6a68a46b8817", 
    appPassword: "AckC9>WB2rP%-c-CJgt;r*MF[bd2" 
});
var qnamaker = new QnAMaker({
    knowledgeBaseId:"6589376d-5941-4145-8e91-e85b1a576d0c",
    endpointKey:"04141649-6eaa-4be5-a189-ba1cdcc1d696",
    host:"https://firstqnass.azurewebsites.net/qnamaker",
});
var luis = new LuisRecognizer({
   applicationId :"61a3745c-46e1-4257-bc14-82f39d4b2e8e",
   endpointKey : "5609cc76659044ab9723db77c5b8ebbb", //"fc0f15f7883e4ebd803878c0c6407159", 
   endpoint :process.env.SECRET
});

const echo:confbot = new confbot(qnamaker, luis);

server.post('/api/message',(req, res) => {
    adapter.processActivity(req, res, async(context) =>{
        await echo.onTurn(context);
    }).catch(err => {
        console.log('error ', err);
    });
});