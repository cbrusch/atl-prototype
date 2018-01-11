$(document).ready(function() {
	console.log("the translation.js file loaded");
	var i = 1;
	var mottoDivEnglish = "._motto--english";
	var epigramDivEnglish = "._epigram--english";
	var discourseDivEnglish = "._discourse--english";
	var mottoDivLatin = "._motto--latin";
	var epigramDivLatin = "._epigram--latin";
	var discourseDivLatin = "._discourse--latin";
	var mottoDivGerman = "._motto--german";
	var epigramDivGerman = "._epigram--german";
	var englishEmblemArray = [];
	var englishEmblemURL
	var emblemDataNum = $('.wrapper-emblem').data("id"); // get the data ID for the current emblem page

/**** I THINK THIS ONLY NEEDS TO OCCUR ONCE, NOT EVERY TIME THE PAGE LOADS ****/
	for (i = 1; i < 51; i++) { // make an array of emblem html files with values of urls + IDs to the content sections
		if (i < 10) { // add a leading zero to the emblem number in the url if the emblem is less than 10
			englishEmblemArray.push({
				motto: "partials/emblems-html/emblem0" + i + "-Facsimile.html #mottoPartial--e",
				epigram: "partials/emblems-html/emblem0" + i + "-Facsimile.html #epigramPartial--e",
				discourse: "partials/emblems-html/emblem0" + i + "-Facsimile.html #discoursePartial--e"
			});	
		}
		else {
			englishEmblemArray.push({
				motto: "partials/emblems-html/emblem" + i + "-Facsimile.html #mottoPartial--e",
				epigram: "partials/emblems-html/emblem" + i + "-Facsimile.html #epigramPartial--e",
				discourse: "partials/emblems-html/emblem" + i + "-Facsimile.html #discoursePartial--e"
			});	
		}
	}
	englishEmblemURL = englishEmblemArray[emblemDataNum]; // associate the URL with the corresponding emblem data ID
	$(mottoDivEnglish).load(englishEmblemURL["motto"]); // load the motto text from the corresponding file
	$(epigramDivEnglish).load(englishEmblemURL["epigram"]); // load the epigram text from the corresponding file
	$(discourseDivEnglish).load(englishEmblemURL["discourse"]); // load the discourse text from the corresponding file


// update url with window.location.href???


console.log(englishEmblemURL["motto"]);


})