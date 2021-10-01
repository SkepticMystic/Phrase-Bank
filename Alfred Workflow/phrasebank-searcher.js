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


function mdToJSON(content) {
     const lines = content.split('\n');
     let pb = [];

     for (let line of lines) {
         // A new heading indicates a new section in the pb
         if (line.startsWith('## ')) {
             let section = line.slice(3);
             pb.push({ section, desc: '', keywords: [], phrases: [] });
             last = pb.length - 1; //last item Index
         // Blockquotes indicate description
         } else if (line.startsWith('> ')) {
             pb[last].desc = line.slice(2);
         // Bullets indicates keywords
         } else if (line.startsWith('- ')) {
             let kws = line.slice(2).split(',');
             pb[last].keywords.push(...kws);
         // Every other non-blank line is considered a phrase
         } else if (line.trim() !== '') {
             pb[last].phrases.push(line);
         }
     }
     return pb;
}


let jsonArray = [];
const phraseJSON = mdToJSON(readFile("phrasebank.md"));

phraseJSON.forEach(section => {
	let sectionName = section.section;

	jsonArray.push({
		'title': sectionName,
		'uid': sectionName,
		'subtitle': section.desc,
		'match': section.keywords.join(" ") + " " + sectionName,
		'arg': JSON.stringify(section),
	});
});

JSON.stringify({ items: jsonArray });
