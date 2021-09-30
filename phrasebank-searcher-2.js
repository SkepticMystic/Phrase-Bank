#!/usr/bin/env osascript -l JavaScript

ObjC.import('stdlib');
function alfredMatcher (str){
	return str.replace (/[-\(\)_\.]/g," ") + " " + str;
}
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let jsonArray = [];
const sectionName = JSON.parse($.getenv('oneSection')).section;
let phrases_array = JSON.parse($.getenv('oneSection')).phrases;
shuffleArray(phrases_array);

phrases_array.forEach(phrase => {
	jsonArray.push({
		'title': phrase,
		'subtitle': sectionName,
		'match': alfredMatcher(phrase),
		'arg': phrase,
	});
});

jsonArray.push({
	'title': "⬅️ Go back",
	'subtitle': "to section section selection",
	'match': "up back section previous",
	'arg': "back",
});

JSON.stringify({ items: jsonArray });

