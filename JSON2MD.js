#!/usr/bin/env osascript -l JavaScript
ObjC.import('Foundation');
const readFile = function (path, encoding) {
    !encoding && (encoding = $.NSUTF8StringEncoding);
    const fm = $.NSFileManager.defaultManager;
    const data = fm.contentsAtPath(path);
    const str = $.NSString.alloc.initWithDataEncoding(data, encoding);
    return ObjC.unwrap(str);
};

const pbJSON = JSON.parse(readFile ("phrasebank.json"));

let mdLines = [];
pbJSON.forEach(item => {
	mdLines.push("## " + item.section);
	mdLines.push(""); //blank line

	if (item.desc)	{
		mdLines.push("> " + item.desc);
		mdLines.push(""); //blank line
	} else {
		mdLines.push("> (source: ref-n-write)");
		mdLines.push(""); //blank line
	}


	if (item.keywords) {
		item.keywords.forEach(keyword =>{
			mdLines.push("- " + keyword);
		});
		mdLines.push(""); //blank line
	}

	item.phrases.forEach(phrase =>{
		mdLines.push(phrase);
	});
	mdLines.push(""); //blank line
	mdLines.push(""); //blank line
});

let newMD = mdLines.join("\n");


app = Application.currentApplication();
app.includeStandardAdditions = true;
app.doShellScript('echo "' + newMD + '" > phrases.md');
