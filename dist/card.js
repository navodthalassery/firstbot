"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_1 = require("botbuilder");
const metronical_proto_1 = require("metronical.proto");
function createCarousel(data, topIntent) {
    const heroCards = [];
    for (let i = 0; i < data.length; i++) {
        heroCards.push(createHeroCard(data[i], topIntent));
    }
    return botbuilder_1.MessageFactory.carousel(heroCards);
}
exports.createCarousel = createCarousel;
function createHeroCard(data, topIntent) {
    let title;
    let subtitle;
    let text = metronical_proto_1.s(data.description).stripHtml().truncateWords(30).toString();
    const images = [];
    if (data.images != null && data.images.length > 0) {
        for (let i = 0; i < data.images.length; i++) {
            images.push(data.images[i].link);
        }
    }
    switch (topIntent) {
        case 'Speaker':
            title = data.speakers;
            subtitle = data.location;
            break;
        case 'Location':
            title = data.location;
            subtitle = `${data.speakers}, ${data.location}`;
            break;
        default:
            throw new Error(`No way to handle ${topIntent}`);
    }
    return botbuilder_1.CardFactory.heroCard(title, botbuilder_1.CardFactory.images(images), botbuilder_1.CardFactory.actions([
        {
            type: botbuilder_1.ActionTypes.OpenUrl,
            title: 'Read more ...',
            value: 'www.gogle.com'
        }
    ]), {
        subtitle: subtitle,
        text: text
    });
}
exports.createHeroCard = createHeroCard;
//# sourceMappingURL=card.js.map