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

	// var mySingleView = '.subnav > ul li:nth-child(1)';
	// var myDoubleView = '.subnav > ul li:nth-child(5)';
	// var myLeftFacs = '.subnav > ul li:nth-child(4)';
	// var myRightFacs = '.subnav > ul li:nth-child(8)';

	// $(mySingleView).click(function() {

	// });

	// $(myLeftFacs).click(function() {
	// 	$(myLeftFacs).addClass('is-active');
	// 	if ($(myLeftFacs).hasClass('is-active') &&  $(mySingleView).hasClass('is-active')) {
	// 		console.log("SHOW FACS SINGLE");
	// 	}
	// 	else if ($(myLeftFacs).hasClass('is-active') && $(myDoubleView).hasClass('is-active')) {
	// 		console.log("FACS LEFT FACS");
	// 	}
	// 	else {
	// 		console.log("THIS ISN'T WORKING -- LEFT");
	// 	}
	// });
	// $(myRightFacs).click(function() {
	// 	$(myRightFacs).addClass('is-active');
	// 	if ($(myRightFacs).hasClass('is-active') && $(myDoubleView).hasClass('is-active')) {
	// 		console.log("SHOW RIGHT FACS");
	// 	}
	// 	else {
	// 		console.log("THIS ISN'T WORKING -- RIGHT")
	// 	}
	// });


	generateJSON();


	/* VARIABLES */
			/* emblem nav */
			var singleNav = '.subnav > ul li:nth-child(n + 2):nth-child(-n + 4)';
			var doubleNav = '.subnav > ul li:nth-last-child(-n + 3)';
			var singleViewBtn = '.subnav > ul li:nth-child(1)';
			var doubleViewBtn = '.subnav > ul li:nth-child(5)';
			var englishSingleView = '.subnav > ul li:nth-child(2)';
			var latinSingleView = '.subnav > ul li:nth-child(3)';
			var facsimileSingleView = '.subnav > ul li:nth-child(4)';
			var englishDoubleView = '.subnav > ul li:nth-child(6)';
			var latinDoubleView = '.subnav > ul li:nth-child(7)';
			var facsimileDoubleView = '.subnav > ul li:nth-child(8)';
			/* emblem languages */
			var singleEmblem = '.emblem__full .emblem';
			var singleTranslation = '.width--100 .english ';
			var singleOriginal = '.width--100 .original';
			var singleFacsimile = '.emblem__full .facsimile';
			var doubleEmblem = '.emblem__full .double';
			var doubleTranslation = '.double .english';
			var doubleOriginal = '.double .original';
			var leftEnglishGroup = '.left-english-text';
			var rightEnglishGroup = '.right-english-text';
			var leftOriginalGroup = '.left-latin-german-text';
			var rightOriginalGroup = '.right-latin-german-text';
			var leftLatinSwitch = '.left .latin-german-switch ul li:nth-child(1)';
			var leftGermanSwitch = '.left .latin-german-switch ul li:nth-child(2)';
			var rightLatinSwitch = '.right .latin-german-switch ul li:nth-child(1)';
			var rightGermanSwitch = '.right .latin-german-switch ul li:nth-child(2)';
			/* emblem halves */
			var emblemWrapper = '.emblem-wrapper';
			var wholeEmblem = '.emblem__full';
			var leftEmblem = '.emblem__left';
			var rightEmblem = '.emblem__right';
			var leftEmblemText = '.emblem__left .emblem';
			var rightEmblemText = '.emblem__right .emblem';
			var leftFacsimile = '.emblem__left ._facsimile-half';
			var rightFacsimile = '.emblem__right ._facsimile-half';
			var rightTranslation = '.emblem__right .english';
			var rightOriginal = '.emblem__right .original';
			/* emblem sections */
			var imageSection = '.emblem__full .image';
			var musicSection = '.emblem__full .music';
			/* side nav */
			var sideNav = '._sidenav';

/* INITIALIZE */
			onLoad(); // display emblem menu and default options on page load

/* EVENTS */
			/* pages */
			$(doubleViewBtn).click(function() { // display split emblem
				console.log("I clicked on DOUBLE view!");
				$(sideNav).addClass('is-hidden');
				isActiveDouble(); // highlight double view
				if( $(facsimileSingleView).hasClass('is-active') ) { // display left facsimile if it is stored
					showFacsimile();
				}
				else if( $(facsimileDoubleView).hasClass('is-active') ) { // display right facsimile if it is stored
					showRightFacsimile();
				}
				else { // display emblem halves in whole emblem container if no facsimile is stored
					splitWholeEmblem();
				}
				return false;
			});
			$(singleViewBtn).click(function() { // display single emblem
				console.log("I clicked on SINGLE view!");
				$(sideNav).removeClass('is-hidden');
				isActiveSingle(); // highlight single view
				rejoinWholeEmblem(); //replace left/right halves with full-width in whole emblem container
				if( $(facsimileSingleView).hasClass('is-active') ) { // display whole facsimile if left facsimile is active when switching from double to single view
					$(sideNav).addClass('is-hidden');
					showFacsimile();
				}
				else if( $(englishSingleView).hasClass('is-active') ) { // display whole english text
					showTranslation();
				}
				else {  // display latin text in full-width or left half
					showOriginalLanguage();
				}
				return false;
			});
			/* languages */
			$(englishSingleView).click(function() { // activate single english
				resetLanguagesOnLeft(); // hide all full-width text or left half text, except image and music sections
				showTranslation(); // show english text in full-width or left half
				if( $(this).hasClass('is-active') ) { 

				}
				else if( $(doubleViewBtn).hasClass('is-active') ) {
					$(sideNav).addClass('is-hidden');
					$(singleNav).removeClass('is-active'); // remove highlight from other options in single nav
					$(this).addClass('is-active'); // highlight selected view option in single nav
					restoreWholeEmblem(); // hide facsimile halves and show whole emblem in double view
				}
				else {
					$(singleNav).removeClass('is-active'); // remove highlight from other options in single nav
					$(this).addClass('is-active'); // highlight selected view option in single nav
					$(sideNav).removeClass('is-hidden');
				}

				return false;
			});
			$(latinSingleView).click(function() { // activate single latin
				resetLanguagesOnLeft(); // hide all full-width text or left half text, except image and music sections
				showOriginalLanguage(); // show latin text in full-width or left half
				if( $(this).hasClass('is-active') ) {

				}
				else if( $(doubleViewBtn).hasClass('is-active') ) {
					$(sideNav).addClass('is-hidden');
					$(singleNav).removeClass('is-active'); // remove highlight from other options in single nav
					$(this).addClass('is-active'); // highlight selected view option in single nav
					restoreWholeEmblem(); // hide facsimile halves and show whole emblem in double view
				}
				else {
					$(singleNav).removeClass('is-active'); // remove highlight from other options in single nav
					$(this).addClass('is-active'); // highlight selected view option in single nav
					$(sideNav).removeClass('is-hidden');
				}

				return false;
			});
			$(facsimileSingleView).click(function() { // activate single facsimile 
				if( $(this).hasClass('is-active') ) {

				}
				else {
					$(singleNav).removeClass('is-active'); // remove highlight from other options in single nav
					$(this).addClass('is-active'); // highlight selected view option in nav
					showFacsimile(); // display full-width or left half facsimile
					$(sideNav).addClass('is-hidden');
				}
				return false;
			});
			$(englishDoubleView).click(function() { // activate double english
				resetLanguagesOnRight(); // hide all full-width text or left half text, except image and music sections
				showTranslationDouble(); // show english text in right half
				if( $(this).hasClass('is-active') ) {

				}
				else {
					$(doubleNav).removeClass('is-active'); // remove highlight from other options in double nav
					$(this).addClass('is-active'); // highlight selected view option in nav
				}
				return false;
			});
			$(latinDoubleView).click(function() { // activate double latin
				resetLanguagesOnRight(); // hide all full-width text or left half text, except image and music sections
				showOriginalLanguageDouble(); // show latin text in right half
				if( $(this).hasClass('is-active') ) {

				}
				else {
					$(doubleNav).removeClass('is-active'); // remove highlight from other options in double nav
					$(this).addClass('is-active'); // highlight selected view option in nav
				}
				return false;
			});
			$(facsimileDoubleView).click(function() { // activate double facsimile
				if( $(this).hasClass('is-active') ) {
					
				}
				else { 
					$(doubleNav).removeClass('is-active'); // remove highlight from other options in double nav
					$(this).addClass('is-active'); // highlight selected view option in nav
					showRightFacsimile();
					if( $(leftFacsimile).hasClass('is-hidden') ) {
	
					}
					else {
						$(leftFacsimile).removeClass('is-hidden');	// display left facsimile
					}
				}
				return false;
			});
			$(leftGermanSwitch).click(function() {
					$(leftGermanSwitch).addClass('is-selected'); // highlight german switch on left side
					$(leftLatinSwitch).removeClass('is-selected'); // remove highlight from latin on left side
					return false;
			});
			$(rightGermanSwitch).click(function() {
					$(rightGermanSwitch).addClass('is-selected'); // highlight german switch on right side
					$(rightLatinSwitch).removeClass('is-selected'); // remove highlight from latin on right side
					return false;
			});
			$(leftLatinSwitch).click(function() {
					$(leftLatinSwitch).addClass('is-selected'); // highlight Latin switch on left side
					$(leftGermanSwitch).removeClass('is-selected'); // remove highlight from German on left side
					return false;
			});
			$(rightLatinSwitch).click(function() {
					$(rightLatinSwitch).addClass('is-selected'); // highlight Latin switch on right side
					$(rightGermanSwitch).removeClass('is-selected'); // remove highlight from German on right side
					return false;
			});
/* FUNCTIONS */
			function onLoad() {
				$(doubleNav).toggleClass('is-hidden'); // hide last 3 language options for double view
				$(singleViewBtn).toggleClass('is-active'); // make "Single View" button active
				$(englishSingleView).toggleClass('is-active'); // highlight english translation as default single text
				// $(facsimileDoubleView).toggleClass('is-active'); // highlight facsimile for Tara's class
				$(latinDoubleView).toggleClass('is-active'); // highlight latin as default double text
				$('.wrapper-vertical-divider').toggleClass('is-disabled'); // hide vertical line that divides text sections
				console.log("I loaded the page");
			}
			// I need to take a deep look at the *pages* event listeners and these two functions below. Are they repeating themselves???
			function isActiveSingle() { // make full-width emblem when single view is active
				console.log("I called isActiveSingle()");
				if( $(singleViewBtn).hasClass('is-active') ) {
					console.log("Single view is already active");
				}
				else {
					$(doubleNav).addClass('is-hidden'); // hide last 3 language options for double view
					$(doubleViewBtn).removeClass('is-active'); // remove highlight from double view button
					$(singleViewBtn).addClass('is-active'); // add highlight to single view button
					$(imageSection).removeClass('double'); // end half width image section
					$(musicSection).removeClass('double'); // end half width music section
					console.log("I'm making single view active in isActiveSingle()");
				}
				console.log("Leaving isActiveSingle()");
			}
			function isActiveDouble() { // split whole emblem into left/right halves
				console.log("I called isActiveDouble()");
				if( $(doubleViewBtn).hasClass('is-active') ) {
					console.log("Double view is already active!!!");
				}
				else if( !$(doubleViewBtn).hasClass('is-active') && $(doubleNav).hasClass('is-hidden') ) {$(emblemWrapper).removeClass('is-sticky'); // remove fixed position from facsimile container
					$(doubleNav).removeClass('is-hidden'); // reveal last 3 language options for double view
					$(singleViewBtn).removeClass('is-active'); // remove highlight from single view button
					$(doubleViewBtn).addClass('is-active'); // add highlight to double view button
					$(imageSection).addClass('double'); // begin half width image section
					$(musicSection).addClass('double'); // begin half width music section
					console.log("I'm making double view active in isActiveDouble()");
				}
				console.log("Leaving isActiveDouble()");
			}
			function splitWholeEmblem() {
				console.log("I called splitWholeEmblem()");
				$('.emblem__full .double').removeClass('is-hidden'); //replace full-width with left/right halves in whole emblem container
				$(leftEmblem).addClass('is-hidden'); //replace full-width with left/right halves in whole emblem container
				$(rightEmblem).addClass('is-hidden');
				console.log("Leaving splitWholeEmblem()");
			}
			function rejoinWholeEmblem() {
				console.log("I called rejoinWholeEmblem()");
				$('.emblem__full .double').addClass('is-hidden'); //replace left/right halves with full-width in whole emblem container
				console.log("Leaving rejoinWholeEmblem()");
			}
			function restoreWholeEmblem() {
				console.log("I called restoreWholeEmblem()");
				if( $(facsimileDoubleView).hasClass('is-active') ) { // display right facsimile if it is stored
				}
				else { // display emblem halves in whole emblem container if no facsimile is stored
					splitWholeEmblem();
					console.log("I should be looking at the whole emblem");
				}
				console.log("Leaving restoreWholeEmblem()");
			}
			function resetLanguagesOnLeft() {
				console.log("I called resetLanguagesOnLeft()");
				$(singleEmblem).removeClass('is-hidden'); // show full-width emblem
				$(singleFacsimile).addClass('is-hidden'); // hide full-width/left-half facsimile
				$(singleTranslation).addClass('is-hidden'); // hide full-width/left-half english text
				$(singleOriginal).addClass('is-hidden'); // hide full-width/left-half original language text
				console.log("Leaving resetLanguagesOnLeft()");
			}
			function resetLanguagesOnRight() {
				console.log("I called resetLanguagesOnRight()");
				$(doubleEmblem).removeClass('is-hidden'); // show right half in whole emblem container
				$(doubleTranslation).addClass('is-hidden'); // hide all english text in right half
				$(doubleOriginal).addClass('is-hidden'); // hide all latin/german text in right half
				$(rightFacsimile).addClass('is-hidden'); // hide right facsimile
				$(rightTranslation).addClass('is-hidden'); // hide right emblem english text
				$(rightOriginal).addClass('is-hidden'); // hide right emblem latin/german text
				console.log("Leaving resetLanguagesOnRight()");
			}
			function showTranslation() {
				console.log("I called showTranslation()");
				$(emblemWrapper).removeClass('is-sticky'); // remove fixed position from facsimile container
				$(singleTranslation).removeClass('is-hidden'); // display english text
				console.log(singleTranslation);
				storeTranslationLeft(); // mark english text to be visible in left container of split facsimile view
				queryFacsimile();
				console.log("Leaving showTranslation()");
			}
			function showTranslationDouble() {
				console.log("I called showTranslationDouble()");
				$(doubleTranslation).removeClass('is-hidden'); // show latin/german text in double half
				storeTranslationRight(); // mark english text to be visible in right container of split facsimile view
				queryFacsimile();
				console.log("Leaving showTranslationDouble()");
			}
			function showOriginalLanguage() {
				console.log("I called showOriginalLanguage()");
				$(emblemWrapper).removeClass('is-sticky'); // remove fixed position from facsimile container
				$(singleOriginal).removeClass('is-hidden'); // display default latin text
				console.log(singleOriginal);
				storeOriginalLeft(); // mark default latin text to be visible in left container of split facsimile view
				queryFacsimile();
				console.log("Leaving showOriginalLanguage()");
			}
			function showOriginalLanguageDouble() {
				console.log("I called showOriginalLanguageDouble()");
				$(doubleOriginal).removeClass('is-hidden'); // show latin/german text in right half of whole emblem container
				storeOriginalLanguageRight(); // mark latin text to be visible in right container of split facsimile view
				queryFacsimile();
				console.log("Leaving showOriginalLanguageDouble()");
			}
			function showFacsimile() {
				console.log("I called showFacsimile()");
				storeFacsimileWhole(); // mark whole facsimile as active, even though the wrapper and its contents may be hidden
				storeFacsimileLeft(); // mark left facsimile as active, even though the wrapper and its contents may be hidden
				if( $(singleViewBtn).hasClass('is-active') ) { // make facsimile 100vh
					hideFacsimileHalves(); // show whole container emblem and hide left/right container emblems
					$(emblemWrapper).addClass('is-sticky'); // give facsimile container a fixed position
				}
				// do I need an else if that applies to left facs when double view is active???
				else if( $(doubleViewBtn).hasClass('is-active') ) {
					hideFacsimileWhole(); // show split container emblems / hide whole container emblem
				}
				console.log("Leaving showFacsimile()");
			}
			function showRightFacsimile() { // show right facsimile and hide right emblem text  
					console.log("I called showRightFacsimile()");
					hideFacsimileWhole();
					storeFacsimileRight();
					console.log("Leaving showRightFacsimile()");
			}
			function storeTranslationLeft() {
				console.log("I called storeTranslationLeft()");
				$('.emblem__left > .emblem').removeClass('is-hidden'); // show left emblem
				$('.emblem__left > .emblem').siblings().addClass('is-hidden'); // hide left facsimile
				$(leftEnglishGroup).removeClass('is-hidden'); // show left english text
				$(leftEnglishGroup).siblings().addClass('is-hidden'); // hide left original text
				console.log("Leaving storeTranslationLeft()");
			}
			function storeTranslationRight() {
				console.log("I called storeTranslationRight()");
				$('.emblem__right > .emblem').removeClass('is-hidden'); // show right emblem
				$('.emblem__right > .emblem').siblings().addClass('is-hidden'); // hide right facsimile
				$(rightEnglishGroup).removeClass('is-hidden'); // show right english text
				$(rightEnglishGroup).siblings().addClass('is-hidden'); // hide right original text
				console.log("Leaving storeTranslationRight()");
			}
			function storeOriginalLeft() {
				console.log("I called storeOriginalLeft()");
				$('.emblem__left > .emblem').removeClass('is-hidden'); // show left emblem
				$('.emblem__left > .emblem').siblings().addClass('is-hidden'); // hide left facsimile
				$(leftOriginalGroup).removeClass('is-hidden'); // show left latin text
				$(leftOriginalGroup).siblings().addClass('is-hidden'); // hide left english text
				console.log("Leaving storeOriginalLeft()");
			}
			function storeOriginalLanguageRight() {
				console.log("I called storeOriginalLanguageRight()");
				$('.emblem__right > .emblem').removeClass('is-hidden'); // show right emblem
				$('.emblem__right > .emblem').siblings().addClass('is-hidden'); // hide right facsimile
				$(rightOriginalGroup).removeClass('is-hidden'); // show right latin/german text
				$(rightOriginalGroup).siblings().addClass('is-hidden'); // hide right latin/german text
				console.log("Leaving storeOriginalLanguageRight()");
			}
			function storeFacsimileWhole() {
				console.log("I called storeFacsimileWhole()");
				$(singleFacsimile).removeClass('is-hidden'); // show full-width facsimile
				$(singleEmblem).addClass('is-hidden'); // hide whole emblem
				console.log("Leaving storeFacsimileWhole()");
			}
			function storeFacsimileLeft() {
				console.log("I called storeFacsimileLeft()");
				$(leftFacsimile).removeClass('is-hidden'); // show left facsimile
				$(leftFacsimile).siblings().addClass('is-hidden'); // hide left emblem text
				console.log("Leaving storeFacsimileLeft()");
			}
			function storeFacsimileRight() {
				console.log("I called storeFacsimileRight()");
				$(rightFacsimile).removeClass('is-hidden'); // show right facsimile
				$(rightFacsimile).siblings().addClass('is-hidden'); // hide right emblem text
				console.log("Leaving storeFacsimileRight()");
			}
			function queryFacsimile() {
				console.log("I called queryFacsimile()");
				if( $(singleViewBtn).hasClass('is-active') ) {
					console.log("SINGLE VIEW is active");
					hideFacsimileHalves(); // hide split facsimile view
				}
				else if( $(doubleViewBtn).hasClass('is-active') && $(leftFacsimile).hasClass('is-hidden') && $(rightFacsimile).hasClass('is-hidden') ) {
					console.log("DOUBLE VIEW is active and I need to HIDE the FACSIMILE HALVES");
					hideFacsimileHalves(); // hide split facsimile view
				}
				console.log("Leaving queryFacsimile()");
			}
			function hideFacsimileHalves() {
				console.log("I called hideFacsimileHalves()");
				console.log("I'm HIDING the FACSIMILE HALVES and SHOWING the WHOLE emblem")
				$(wholeEmblem).removeClass('is-hidden'); // show whole emblem
				$(leftEmblem).addClass('is-hidden'); // hide left emblem
				$(rightEmblem).addClass('is-hidden'); // hide right emblem
				console.log("Leaving hideFacsimileHalves()");
			}
			function hideFacsimileWhole() { // ***this has to happen whenever facsimile is selected in split view
				console.log("I called hideFacsimileWhole()");
				$(wholeEmblem).addClass('is-hidden'); // hide whole emblem
				$(leftEmblem).removeClass('is-hidden'); // show left emblem
				$(rightEmblem).removeClass('is-hidden'); // show right emblem
				console.log("Leaving hideFacsimileWhole()");
			}


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