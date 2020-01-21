import * as fs from 'fs';
import {load as CheerioLoad} from 'cheerio';
import {SpeakerImage, SpeakerSession} from './types';

const file:string = fs.readFileSync('./data/edu2020.xml','utf-8');
const xml: CheerioStatic = CheerioLoad(file);

export function getData(entities:any) : SpeakerSession[] {
    if (entities != null) {
        let person = entities["person"];
        let subject = entities["subject"];

        if (person != null) {
            return getSessionByPerson((person instanceof Array) ? person[0] : person);
        }
        if (subject != null) {
            return getSessionBySubject((subject instanceof Array) ? subject[0] : subject);
        }
    }
    return [];
}

function getSessionByPerson(person:string, data?:SpeakerSession) : SpeakerSession[] {
    return writeEvent(getEventNodes('speakers', person));
}
function getSessionBySubject(subject:string, data?:SpeakerSession) : SpeakerSession[] {
    return writeEvent(getEventNodes('keyword', subject));
}

function getEventNodes(s:string, t:string) : CheerioElement[] {
    var events : CheerioElement[] = [];
    xml(s).each((idx: number, elem:CheerioElement) => {
        if (xml(elem).text().toLowerCase().indexOf(t.toLowerCase()) > -1) {
            events.push(elem.parent);
        }   
    });
    return events;
}

function writeEvent(events: Array<CheerioElement>) : SpeakerSession[] {
    var results : SpeakerSession[] = [];
    for (let index = 0; index < events.length; index++) {
        const elem = xml(events[index]);
        let r : SpeakerSession = {
            date: '',//elem.parent().attr('date'),
            startTime: '', //elem.attr('start-time'),
            endTime: '', //elem.attr('endtime'),
            title: elem.find('title').text(),
            description: elem.find('description').text(),
            speakers: elem.find('speakers').text(),
            location: elem.find('location').text(),
            keywords: elem.find('keyword').text(),
            link: elem.find('pge').text(),
            type: '', //elem.attr('type')
        };
        let img = elem.find('poto');
        if (img!= null) {
            let imgs: SpeakerImage[] = [];
            img.each((idx: number, el:CheerioElement) => {
                imgs.push({
                    type:'', //xml(el).attr('type'),
                    link:xml(el).text()
                });
            });
            r.images = imgs;
        }
        results.push(r);
    }
    return results;
}
