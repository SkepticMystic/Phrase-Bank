#!/usr/bin/env osascript -l JavaScript

function run (argv){

	//input
	const phrase_array = JSON.parse(argv.join("")).phrases;
	let randomIndex = Math.floor(Math.random() * (phrase_array.length + 1));

	return phrase_array[randomIndex];
}
