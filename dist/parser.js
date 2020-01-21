"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const cheerio_1 = require("cheerio");
const file = fs.readFileSync('./data/edu2020.xml', 'utf-8');
const xml = cheerio_1.load(file);
function getData(entities) {
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
exports.getData = getData;
function getSessionByPerson(person, data) {
    return writeEvent(getEventNodes('speakers', person));
}
function getSessionBySubject(subject, data) {
    return writeEvent(getEventNodes('keyword', subject));
}
function getEventNodes(s, t) {
    var events = [];
    xml(s).each((idx, elem) => {
        if (xml(elem).text().toLowerCase().indexOf(t.toLowerCase()) > -1) {
            events.push(elem.parent);
        }
    });
    return events;
}
function writeEvent(events) {
    var results = [];
    for (let index = 0; index < events.length; index++) {
        const elem = xml(events[index]);
        let r = {
            date: '',
            startTime: '',
            endTime: '',
            title: elem.find('title').text(),
            description: elem.find('description').text(),
            speakers: elem.find('speakers').text(),
            location: elem.find('location').text(),
            keywords: elem.find('keyword').text(),
            link: elem.find('pge').text(),
            type: '',
        };
        let img = elem.find('poto');
        if (img != null) {
            let imgs = [];
            img.each((idx, el) => {
                imgs.push({
                    type: '',
                    link: xml(el).text()
                });
            });
            r.images = imgs;
        }
        results.push(r);
    }
    return results;
}
//# sourceMappingURL=parser.js.map