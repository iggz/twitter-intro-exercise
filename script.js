"use strict"

// n.b. call in 'djtJSON' from other .js file in html for
// the DJT tweet data (saved locally)
const yeURL = "https://api.kanye.rest";

/********************/
/* get kanye quotes */
/********************/
function getYe() {
	// getter for kanye quotation

	// first, perform GET request on kanye API
	fetch(yeURL)
	// second, parse the response as a json object
	.then(response => response.json())
	// third, extract the quotation & build it
	.then(data => {
		buildList(data.quote, 'kanye');
	});
}

function buildYe(num) {
	// given a number, get that many quotations of kanye's
	// to be used later
	for (let i=0; i<num; i++) {
		getYe();
	}
}

/*********************************/
/* populate the list with tweets */
/*********************************/
function buildList(obj, name) {
	// given an array of tweets or quotations, dynamically 
	// add the quoted content to the page
	
	// build out the list of trump tweets
	if (name == "trump") {
		// loop over the array of tweets
		obj.forEach(tweet => {
			// first, get the literal tweet content
			let tweetText = tweet.full_text;
			// second, create & add in a list item for said tweet
			createListItem(tweetText, name);
		})
	}
	// otherwise, it's the kanye quotations
	else {
		// obj.forEach(quotation => {
			// go ahead and create the list item
			// console.log(quotation);
			// createListItem(quotation, name);
			createListItem(obj, name);
		// })
	}
}

function createListItem(text, name) {
	// given a tweet's text, create a 'li' item for it and
	// add it to its corresponding 'ul'. the relevant person
	// will be passed in as 'name'.

	// select the ul element
	const ul = document.querySelector(`.${name}`);
	// create li element
	const li = document.createElement("li");
	// add in the text
	li.textContent = text;
	// populate the ul
	ul.append(li);
}

// main method to run program
function main() {
	buildList(djtJSON, 'trump');
	buildYe(20);
}

main();