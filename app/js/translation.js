$(document).ready(function() {
	console.log("the translation.js file loaded");
	var i = 1;
	var j = 0;
	var englishEmblemArray = [];
	var englishEmblemURL
	var emblemDataNum = $('.wrapper-emblem').data("id"); // get a numerical ID for the current emblem page
	while (i < 50+1) { // make an array of urls to each english emblem proof page
		if (i < 10){ // add a leading zero to the emblem number in the url if the emblem is less than 10
			englishEmblemArray.push("partials/emblems-html/emblem0" + i++ + "-Facsimile.html #motto-e");
		}
		else {
			englishEmblemArray.push("partials/emblems-html/emblem" + i++ + "-Facsimile.html #motto-e");
		}
	}
	englishEmblemURL = englishEmblemArray[emblemDataNum]; // associate the URL with the corresponding emblem data ID
	$('._motto--english').load(englishEmblemURL); // load the emblem text from the corresponding URL
	console.log(englishEmblemArray[emblemDataNum]);
})