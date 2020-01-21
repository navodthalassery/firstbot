import {SpeakerSession} from './types';
import {MessageFactory,Activity,CardFactory,Attachment, ActionTypes} from 'botbuilder';
import {s} from 'metronical.proto';

export function createCarousel(data:SpeakerSession[], topIntent:string) : Partial<Activity> {
    const heroCards = [];
    for (let i = 0; i < data.length; i++) {
        heroCards.push(createHeroCard(data[i],topIntent));
    }
    return MessageFactory.carousel(heroCards);
}

export function createHeroCard(data:SpeakerSession, topIntent:string) {
    let title:string;
    let subtitle:string;
    let text:string = s(data.description).stripHtml().truncateWords(30).toString();
    const images: string[] = [];
    if (data.images != null && data.images.length > 0) {
        for (let i = 0; i < data.images.length; i++) {
            images.push(data.images[i].link);
        }
    }

    switch (topIntent) {
        case 'Speaker':
            title=data.speakers;
            subtitle=data.location;
            break;
        case 'Location':
            title=data.location;
            subtitle=`${data.speakers}, ${data.location}`;
            break;
        default:
            throw new Error(`No way to handle ${topIntent}`);
    }
    return CardFactory.heroCard(
        title,
        CardFactory.images(images),
        CardFactory.actions([
            {
                type:ActionTypes.OpenUrl,
                title:'Read more ...',
                value:'www.gogle.com'
            }
        ]),
        {
            subtitle:subtitle,
            text:text
        }
    )
}