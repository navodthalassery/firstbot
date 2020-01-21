import { SpeakerSession } from './types';
import { TurnContext } from "botbuilder";
import {QnAMaker, LuisRecognizer} from 'botbuilder-ai';
import {IQnAService,QnaMakerService} from 'botframework-config';
import {getData} from './parser';
import {createCarousel, createHeroCard} from './card';

export class echobot {
    async onTurn(context: TurnContext) {
        if (context.activity.type === 'message') {
            context.sendActivity(`Nav said ${context.activity.text}`);
          } else {
              context.sendActivity(`event deletected ${context.activity.type}`);
          }
    }
}

export class confbot {
    private _qnamaker:QnAMaker
    private _luis:LuisRecognizer

    constructor(qnamaker:QnAMaker,
        luis:LuisRecognizer) {
        this._qnamaker = qnamaker;
        this._luis = luis;

    }
    async onTurn(context: TurnContext) {
        if (context.activity.type === 'message') {
            var rslt =  await this._qnamaker.generateAnswer(context.activity.text);
            //if (rslt.length > 0) {
                //console.log('rslts ',rslt.length);
            //    context.sendActivity(rslt[0].answer);
            //}else {
                //console.log('rslts1 ',rslt.length);
                await this._luis.recognize(context).then(rsl => {
                    const top = LuisRecognizer.topIntent(rsl);
                    //context.sendActivity(`Top intent was found is ${top}`);
                    let data : SpeakerSession[] = getData(rsl.entities);
                    if (top === 'Time') {
                        //
                    } else if (data.length > 1) {
                        context.sendActivity(createCarousel(data, top));
                    } else if (data.length === 1) {
                        context.sendActivity({
                            attachments:[createHeroCard(data[0], top)]
                        });
                    }
                });
            }
        //   } 
        //   else {
        //       context.sendActivity(`event deletected ${context.activity.type}`);
        //   }
    }
}