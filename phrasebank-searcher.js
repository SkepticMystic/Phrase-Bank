#!/usr/bin/env osascript -l JavaScript

ObjC.import('Foundation');
const readFile = function (path, encoding) {
    !encoding && (encoding = $.NSUTF8StringEncoding);
    const fm = $.NSFileManager.defaultManager;
    const data = fm.contentsAtPath(path);
    const str = $.NSString.alloc.initWithDataEncoding(data, encoding);
    return ObjC.unwrap(str);
};
function alfredMatcher (str){
	return str.replace (/[-\(\)_\.]/g," ") + " " + str;
}

let jsonArray = [];
var phraseJSON = JSON.parse(readFile("phrasebank.json"));

phraseJSON.forEach(section => {
	let sectionName = section.section;
	jsonArray.push({
		'title': sectionName,
		'uid': sectionName,
		'subtitle': "",
		'match': alfredMatcher(sectionName),
		'arg': JSON.stringify(section),
	});
});

JSON.stringify({ items: jsonArray });
