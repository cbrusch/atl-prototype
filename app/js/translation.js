$(document).ready(function() {
	console.log("I loaded the translation js file");
	var i = 1;
	var j = 0;
	var englishEmblemsArray = [];
	var url = "partials/emblems-html/emblem04-Facsimile.html #motto-e";
	console.log(url);
	$('._motto--english').load(url);
	while (i < 50+1) {
		if (i < 10){
			englishEmblemsArray.push("partials/emblems-html/emblem0" + i++ + "-Facsimile.html #motto-e");
		}
		else {
			englishEmblemsArray.push("partials/emblems-html/emblem" + i++ + "-Facsimile.html #motto-e");
		}
		
	}
	console.log(englishEmblemsArray[10]);
})