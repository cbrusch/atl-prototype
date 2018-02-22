$(document).ready(function() {
	var topNavEl = "._topnav";
	var topNavPartial = "../partials/_topnav.html";
	var i
	var frontispieceElEnglish = "._frontispiece--english";
	var bioElEnglish = "._bio--english";
	var prefaceElEnglish = "._preface--english";
	var mottoElEnglish = "._motto--english";
	var epigramElEnglish = "._epigram--english";
	var discourseElEnglish = "._discourse--english";
	var mottoElLatin = "._motto--latin";
	var epigramElLatin = "._epigram--latin";
	var discourseElLatin = "._discourse--latin";
	var mottoElGerman = "._motto--german";
	var epigramElGerman = "._epigram--german";
	var englishEmblemArray = [];
	var englishEmblemURL
	var emblemDataNum = $('.emblem-page').data("id"); // get the data ID for the current emblem page
	var myEmblem = emblemDataNum - 4;
	var sideNavEl = "._sidenav";
	var sideNavPartial = "../partials/_sidenav.html";
	var imageEl = "._image";
	var imagePartial = "../partials/_image.html";
	var facsimileEl = "._facsimile";
	var facsimilePartial = "../partials/_facsimile.html";
	var facsimileHalfEl = "._facsimile-half";
	var facsimileHalfPartial = "../partials/_facsimileHalf.html";
	var frontMatterXML = "../partials/emblems-html/Introduction-Read.html";
	var frontispiecePartial = frontMatterXML + " #frontispiecePartial--e";
	var bioPartial = frontMatterXML + " #bioPartial--e";
	var prefacePartial = frontMatterXML + " #prefacePartial--e";


	generateJSON();


// update url with window.location.href???


	function generateJSON(){
	/**** I THINK THIS ONLY NEEDS TO OCCUR ONCE, NOT EVERY TIME THE PAGE LOADS ****/
		for (i = 1; i < 51; i++) { // make an array of emblem html files with values of urls + IDs to the content sections
			if (i < 10) { // add a leading zero to the emblem number in the url if the emblem is less than 10
				englishEmblemArray.push({
					motto: "../partials/emblems-html/emblem0" + i + "-Read.html #mottoPartial--e h3.title",
					epigram: "../partials/emblems-html/emblem0" + i + "-Read.html #epigramPartial--e .verse-epigram",
					discourse: "../partials/emblems-html/emblem0" + i + "-Read.html #discoursePartial--e"
				});	
			}
			else {
				englishEmblemArray.push({
					motto: "../partials/emblems-html/emblem" + i + "-Read.html #mottoPartial--e h3.title",
					epigram: "../partials/emblems-html/emblem" + i + "-Read.html #epigramPartial--e .verse-epigram",
					discourse: "../partials/emblems-html/emblem" + i + "-Read.html #discoursePartial--e"
				});	
			}
		}
		identifyEmblem();
	}

	function identifyEmblem(){
		englishEmblemURL = englishEmblemArray[myEmblem]; // associate the URL with the corresponding emblem data ID
		loadPartials();
	}

	function loadPartials(){
		$(topNavEl).load(topNavPartial); // load the global navigation partial
		$(sideNavEl).load(sideNavPartial); // load the side nav partial
		$(frontispieceElEnglish).load(frontispiecePartial); // load the frontispiece text from the XML file
		$(facsimileEl).load(facsimilePartial); // load the full facsimile image viewer partial
		$(facsimileHalfEl).load(facsimileHalfPartial); // load the half facsimile image viewer partial
		$(bioElEnglish).load(bioPartial); // load the bio text from the XML file
		$(prefaceElEnglish).load(prefacePartial); // load the preface text from the XML file
		$(mottoElEnglish).load(englishEmblemURL["motto"]); // load the motto text from the XML file
		$(epigramElEnglish).load(englishEmblemURL["epigram"]); // load the epigram text from the XML file
		$(discourseElEnglish).load(englishEmblemURL["discourse"]); // load the discourse text from the XML file
		$(imageEl).load(imagePartial); // load the emblem image partial
	}
})