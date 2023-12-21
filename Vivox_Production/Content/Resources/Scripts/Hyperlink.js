function getElementsWithAttribute(attr){
	var elementsWithAttribute = [];
	var elements = document.body.getElementsByTagName('*');
	for (let i = 0; i < elements.length; i++)
	{
		if (elements[i].getAttribute(attr))
		{
			elementsWithAttribute.push(elements[i]);
		}
	}
	return elementsWithAttribute;
}

function constructTOCPath(stringToSplit, splitChar, pathAttribute){
	var first = stringToSplit.split(splitChar);
	if(first.length > 2)
	{
		first[1] = first[2];
		second = first[1].split('%7C');
	}
	else{
		second = first[1].split('%7C');
	}
	var correctToC = '';
	var coreLocation = -1;
	for(let i = 0; i < second.length; i++)
	{
		if(second[i] == 'Android')
		{
			checkCookie("Android");
			coreLocation = 3;
			break;
		}
		if(second[i] == 'iOS')
		{
			checkCookie("iOS");
			coreLocation = 3;
			break;
		}
		if(second[i] == 'macOS')
		{
			checkCookie("macOS");
			coreLocation = 3;
			break;
		}
		if(second[i] == 'Universal')
		{
			checkCookie("UniversalWindowsPlatform");
			coreLocation = 3;
			break;
		}
		if(second[i] == 'Windows')
		{
			checkCookie("Windows");
			coreLocation = 3;
			break;
		}
		if(second[i] == 'Xbox')
		{
			checkCookie("Xbox");
			coreLocation = 3;
			break;
		}
		if(second[i] == 'PlayStation')
		{
			checkCookie("PlayStation");
			coreLocation = 3;
			break;
		}
		if(second[i].includes('Web') && second[i].includes('20Developer') && second[i].includes('20Guide'))
		{
			coreLocation = i;
			break;
		}
		if(second[i].includes('Core') &&second[i].includes('20Integration') && second[i].includes('20Guide'))
		{
			coreLocation = i;
			break;
		}
		if(second[i].includes('Access') && second[i].includes('20Token') && second[i].includes('20Developer'))
		{
			coreLocation = i;
			break;
		}
		if(second[i].includes('Server') && second[i].includes('20to') && second[i].includes( '20Server'))
		{
			coreLocation = i;
			break;
		}
		if(second[i].includes('Core') && second[i].includes('20API') && second[i].includes('20Reference') && second[i].includes('20Manual'))
		{
			coreLocation = i;
			break;
		}
		if(second[i] == 'Unity' && second[i + 1].includes('20API') && second[i + 2].includes('20Reference') && second[i + 3].includes('20Manual'))
		{
			coreLocation = i;
			break;
		}
		if(second[i] == 'Unreal' && second[i + 1].includes('20API') && second[i + 2].includes('20Reference') && second[i + 3].includes('20Manual'))
		{
			coreLocation = i;
			break;
		}
		if(second[i].includes('____'))
		{
			coreLocation = i;
			break;
		}

	}

	if(pathAttribute.includes('[Platform]'))
	{
		var platform = getCookie("platform");
		if(platform == "UniversalWindowsPlatform")
		{
			platform = "Universal%20Windows%20Platform"
		}
		if (platform == "Xbox")
		{
			platform = "Xbox%20One"
		}
		pathAttribute = pathAttribute.replace("[Platform]", platform);
	}

	//If coreLocation is still invalid, sets it to the final index.
	if(coreLocation == -1)
	{
		coreLocation = second.length - 1;
	}
	if(splitChar == '?')
	{
		correctToC = second[0];
	}
	//ConstructTOCPath
	for(let i = 1; i < coreLocation; i++)
	{
		correctToC +=  '%7C' + second[i];
	}
	correctToC += pathAttribute;
	correctToC = "%3FTocPath%3DCore" + correctToC;
	return correctToC;
}

function constructURL  (elementToConstruct, parent) {
	//Full explanation at: https://docs.google.com/document/d/1cZ4zv4Tu87Kor76qOG6Ks6jHc7mt0YGeyJd5P0yo9tA/edit?usp=sharing
	//Grabs our current URL
	var str = new String(parent.location.href);
	var first = '';
	var second = '';
	var correctURL = '';
	//Char that delineates the main split in the URL - either #(for tripane) or ?(for sidenav)
	//fileSplit is # for mainsplit == #, and / for mainsplit == ?
	//Tripane generates some tokens, one of which is

	if(str.includes('?'))
	{
		if(str.split('?')[1].startsWith("Highlight"))
		{
			first = str.split('?');
			second = first[0].split('#');
			correctURL = second[0] + '#' + elementToConstruct.getAttribute('filepath');
			var link = elementToConstruct.innerHTML;
			var result = link.link(correctURL);
			elementToConstruct.innerHTML = result;
			//Sends our correctedURL out for the click function
			return correctURL;

		}
		mainSplit = '?';
		fileSplit = '/';
	}
	else {
		var mainSplit = '#';
	  var fileSplit = '#';
	}

	second = str.split('%');
	var third = '';
	if(str.includes(mainSplit))
	{
		var correctToCPath = constructTOCPath(str, mainSplit, elementToConstruct.getAttribute('tocpath'));
		first = str.split(mainSplit);
		if(first.length > 2)
		{
			first[1] = first[2];
			second = first[1].split('%');
			second.shift();
		}
		else{
			second = first[1].split('%');
		}
		third = first[0].split('/');
	}
	else {
		third = str.split('/');
		//elementToConstruct.innerHTML = third;
	}

  //Grabs the correct information from the attributes
	//TOCUP
	//var correctToCPath = elementToConstruct.getAttribute('tocpath');
	var correctFilePath = elementToConstruct.getAttribute('filepath');
	if(elementToConstruct.hasAttribute('options'))
	{
		//Grabs your option strings
		var optionString = elementToConstruct.getAttribute('options');
		//Splits on comma
		var options = optionString.split(',');
		for(let i = 0; i < second.length; i++)
		{
			for(let j = 0; j < options.length; j++)
			{
				//Checks if the ToCpath contains our option
				if(second[i].toLowerCase().includes(options[j].toLowerCase()))
				{
					//Splits the file path for reconstruction
					var splitFilePath = correctFilePath.split('/');
					//Replaces 1st section with our option
					splitFilePath[0] = options[j];
					//Resets the filepath
					correctFilePath = '';
					for(let k = 0; k < splitFilePath.length; k++)
					{
						//Adds everything together with the replaced first chunk
						correctFilePath += splitFilePath[k];
						if(k != splitFilePath.length - 1)
						{
							correctFilePath += '/';
						}
					}
				}
			}
		}
	}
	var correctFilePath = fileSplit + correctFilePath;
  	//Starts constructing the URL with the base section we don't change, then the new filepath we plan on using

  	var outputs = ["GeneralCore", "GeneralUnity", "GeneralUnreal", "XboxCore", "XboxUnreal", "XboxUnity", "PlaystationCore", "PlaystationUnity", "PlaystationUnreal", "WebOutput"];

	if(mainSplit == '?')
	{
		for(let i = 0; i < third.length; i++)
		{
			correctURL += third[i];
			if(outputs.includes(third[i]))
			{
				correctURL += correctFilePath;
				break;
			}
			if(i != third.length - 1)
			{
				correctURL += '/';
			}
		}
	}
	else
	{
			correctURL = first[0] + correctFilePath;
	}
	//For loop to reconstruct every section of the ToCPath prior to the new coreLocation we want to set
	//elementToConstruct.innerHTML = second;
	if(mainSplit == '?' && str.includes(mainSplit))
	{
		correctURL+= mainSplit + correctToCPath;
	}
	else if(mainSplit == '#')
	{
		correctURL += correctToCPath;
	}
	//Tags on our correctToCPath from attributes
	//This is where the return goes
	//correctURL += correctToCPath;
  //Constructs a link to the correct page - NOTE: WE DONT USE THIS LINK, IT'S JUST FOR LOOKS - CREATING HYPERLINKS WITH JAVASCRIPT IN TRIPANE CAUSES PROBLEMS
	var str = elementToConstruct.innerHTML;
	var result = str.link(correctURL);
	elementToConstruct.innerHTML = result;
	//Sends our correctedURL out for the click function
	return correctURL;
}

function getPlatformTag(){
	var platform = getCookie("platform");
	var conditionTag = "General." + platform;
	return conditionTag;
}

function getEngineTag()
{
	var URLStr = new String(parent.location.href);

	var URLSplitArray = URLStr.split('%3D');

	var conditionalTagString;

	//check through the split pieces of the URL to find a string that starts with U(but not universal) or C, which will be unity, unreal or Core.
	for(var i = 0; i < URLSplitArray.length; i++)
	{
			var testString = URLSplitArray[i];
			if((testString.startsWith("C"))||(testString.startsWith("U") && !testString.startsWith("Universal"))||(testString.startsWith("Web")))
			{
				if(testString.includes("%7C"))
				{
					var testStringSplit;
					testStringSplit = testString.split("%7C"); //%2520 represents a space in the tripane ToCPath
					conditionalTagString = "General.";
					conditionalTagString = conditionalTagString + testStringSplit[0];
					return conditionalTagString;
				}
				else if(testString.includes("%2520"))
				{
					var testStringSplit;
					testStringSplit = testString.split("%2520"); //%20 represents a space in the sidenav ToCPath
					conditionalTagString = "A+B".split('+');
					conditionalTagString[0] = "General.";
					//conditionalTagString[1] = "General.";
					conditionalTagString[0] = conditionalTagString[0] + testStringSplit[0];
					//for(var i = 1; i < testStringSplit.length; i++)
					//{
					//	conditionalTagString[1] = conditionalTagString[1] + testStringSplit[i];
					//}
					return conditionalTagString;
				}
			}


	}
	conditionalTagString = "0"; //This code is only reached if there is no tag, so it throws a default value
	return conditionalTagString;
}

function flipConditions(elements, condition){
	for (var i = 0; i < elements.length; i++) {
		conditionList = condition.split('+');
		isVisible = false;
		for(var j = 0; j < conditionList.length; j++)
		{
			if (elements[i].getAttribute('data-mc-conditions').includes(conditionList[j]) || elements[i].getAttribute('data-mc-conditions').includes('General.Code')) {
				//this shows text with same conditional tag
				elements[i].style.display = "";
				isVisible = true;
				break;
			}
			else
			{
				elements[i].style.display = "none";
				isVisible = false;
			}
		}
	}
}

function findLinks(){
	setPlatformCookie();
	fixBreadcrumbs();
	var elements = getElementsWithAttribute('tocpath');
	var conditionalElements = getElementsWithAttribute('data-mc-conditions');
	var platformString = getPlatformTag();
	var engineString = getEngineTag();
	platformString = platformString + "+" + engineString;
	var parent = (window.parent.document);
	flipConditions(conditionalElements, platformString);
	for(let i = 0; i < elements.length; i++)
	{
		elements[i].setAttribute('href',constructURL(elements[i], parent));
		//Tags the element with a click function to relocate the parentWindow to the new URL, this hijacks the hyperlink to prevent issues with the tripane format
		$(elements[i]).click(function(e){
			e.preventDefault();
			//This is nasty, but it uses the link from the newly constructed Hyperlink from ConstructURL to allow more then one hyperlink per page.
			parent.location.href = elements[i].getElementsByTagName('a')[0].getAttribute('href');
		})
	}
}

function fixBreadcrumbs()
{
	var breadcrumbElement = getElementsWithAttribute('data-mc-breadcrumbs-count');
	$(breadcrumbElement).on("mouseenter", "a", function(){
		if($(this).attr('id') == "set")
		{
			return;
		}
		var currentBase = parent.location.href.split('#');
		currentBase = currentBase[0];
		var currentTarget = $(this).attr('href').split('/');
		var targetLocation = "";
		for(let j = 0; j < currentTarget.length; j++)
		{
			if(currentTarget[j] != "..")
			{
				targetLocation += (currentTarget[j] + '/');
			}
		}
		$(this).attr("href", currentBase + "#" +  targetLocation);
		$(this).attr("id", "set");
		$(this).click(function(e) {
			e.preventDefault();
			parent.location.href = $(this).attr("href");
		})
	});
}

function setPlatformCookie() {
	if(parent.location.href.includes("xbox"))
	{
		checkCookie("XboxOne");
	}
	if(parent.location.href.includes("playstation"))
	{
		checkCookie("PlayStation");
	}
	if(parent.location.href.includes("general"))
	{
		checkCookie("General");
	}
}

function checkCookie(currentPlatform) {
  var platform = getCookie("platform");
  if (platform == currentPlatform) {
    return;
  } else {
  	setCookie("platform", currentPlatform, 5);
  }
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "General";
}

function setCookie(cname, cvalue, exmins) {
  var d = new Date();
  d.setTime(d.getTime() + (exmins * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

window.onload = findLinks();
