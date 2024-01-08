function constructHref(elementToConstruct, correctLocation, correctEngine)
{
  var title = document.getElementsByClassName("Title");
  if(title[0].innerHTML.includes("English"))
  {
    return;
  }

  //console.log("Constructing Href");
  var href = elementToConstruct.getAttribute("href");
  if(correctEngine == "")
  {
    if(elementToConstruct.innerHTML.includes(" "))
    {
      correctEngine = elementToConstruct.innerHTML.split(" ")[0];
    }
  }

  var validPlatforms = "Android, iOS, macOS, Windows, Universal%2520Windows%2520Platform, Xbox, PlayStation, Nintendo";
  var splitChar;
  var hrefPlatform = href.split("%7C",3);
  if(!validPlatforms.includes(hrefPlatform))
  {
    //console.log("Not doin it");
    return;
  }

  //Replace the platform with the correct one
  for(let i = 1; i < hrefPlatform.length; i++)
  {
    if(hrefPlatform[i].includes("%2520"))
    {
      splitChar = "%2520";
    }
    else if (hrefPlatform[i].includes("%20")){
      splitChar = "%20";
    }
    else {
      hrefPlatform[i] = correctLocation;
      continue;
    }
    var hrefSecondSplit = hrefPlatform[i].split(splitChar);
    var sectionToAdd = "";
    var innerLocation = 0;
    //console.log(hrefSecondSplit.length);
    for(let j = 0; j < hrefSecondSplit.length; j++)
    {
      if(hrefSecondSplit[j].startsWith("C") || (hrefSecondSplit[j].startsWith("U") && !hrefSecondSplit[j].startsWith("Universal")) || (hrefSecondSplit[j].startsWith("W") && !hrefSecondSplit[j].startsWith("Windows")))
      {
        hrefSecondSplit[j] = correctEngine;
        //console.log(hrefSecondSplit[j]);
      }
      else
      {
        //console.log(innerLocation + " " + correctLocation.length);
        if(innerLocation < correctLocation.length)
        {
          hrefSecondSplit[j] = correctLocation[innerLocation];
          innerLocation++;
        }
      }
      sectionToAdd += hrefSecondSplit[j];
      if(innerLocation != correctLocation.length)
      {
        sectionToAdd += "%20";
      }
      else
      {
        break;
      }
    }
    hrefPlatform[i] = sectionToAdd;
  }
  var hrefSplitArray = href.split('%7C');
  var finalHref = "";
  for(let i = 0; i < hrefPlatform.length; i++)
  {
    finalHref += hrefPlatform[i]+"%7C";
  }
  //Rebuild the entire href
  for(let i = hrefPlatform.length; i < hrefSplitArray.length; i++)
  {
    if(i == hrefSplitArray.length - 1)
    {
      finalHref += hrefSplitArray[i]
      break;
    }
    finalHref += hrefSplitArray[i]+"%7C";
  }
  //console.log("Href constructed for:" + elementToConstruct.innerHTML + " as " + finalHref);
  elementToConstruct.href = finalHref;
}

function getCurrentEngine()
{
  var currentEngine;
  var href = new String(parent.location.href);
  var hrefSplit = href.split('%7C');
  if(hrefSplit.length >= 3)
  {
    if(hrefSplit[2].includes("%2520"))
    {
      currentEngine = hrefSplit[2].split('%2520')[0];
    }
    else if(hrefSplit[2].includes("%20"))
    {
      currentEngine = hrefSplit[2].split('%20')[0];
    }
    else {
      currentEngine = "";
      //console.log("No engine found");
    }
  }
  return currentEngine;
}

function getCurrentLocation()
{
  //console.log("Attempting current location grab");
  var currentLocation = [];
  var href = new String(parent.location.href);
  var hrefSplit = href.split('%7C');
  var hrefSecondSplit = [];
  //console.log("Splits");
  if(hrefSplit[1].includes("%2520"))
  {
    //console.log("Tripane split");
    hrefSecondSplit = hrefSplit[1].split("%2520");
  }
  else if(hrefSplit[1].includes("%20"))
  {
    //  console.log("Sidenav split");
    hrefSecondSplit = hrefSplit[1].split("%20");
  }
  else
  {
    currentLocation.push(hrefSplit[1]);
    //console.log("Exitting with no split found " + hrefSplit[1]);
    return currentLocation;
  }

  for(let i = 0; i < hrefSecondSplit.length; i++)
  {
    currentLocation.push(hrefSecondSplit[i]);
  }
  //console.log("Got current location" + currentLocation);
  return currentLocation;
}

function getElementsWithMiniTOCTag()
{
	var divElements = [];
	divElements = document.body.getElementsByTagName('div');

	var elementClass= '';
	var str = "MCMiniTocBox_0 miniToc nocontent";
	var divTOC;
	var elementNames = " ";

	for (let i = 0; i < divElements.length; i++)
	{
		elementClass = divElements[i].className;

		if(elementClass.includes(str))
		{
			divTOC = divElements[i];
		}

		elementNames = divElements.innerHTML;
	}

	if(divTOC === null)
	{
		divTOC = "undef";
	}

	var MiniTOCElements = [];
	MiniTOCElements = divTOC.getElementsByTagName('*');
  	//console.log("Collected miniToC elements");
	return MiniTOCElements;
}

var callback = function CollectHrefs()
{
	var children = [];
  //console.log("Started collecting Hrefs");
	var MiniTOCElements = getElementsWithMiniTOCTag();
  var currentLocation = getCurrentLocation();
  var currentEngine = getCurrentEngine();

	for (let i = 0; i < MiniTOCElements.length; i++)
	{
		if(MiniTOCElements[i].tagName == 'A')
		{
			children.push(MiniTOCElements[i]);
		}
	}
  for(let i = 0; i < children.length; i++)
  {
    constructHref(children[i], currentLocation, currentEngine);
  }
	return children;
}

function setObserver()
{
  // Select the node that will be observed for mutations
  var targetNode = document.getElementsByClassName("MCMiniTocBox_0 miniToc nocontent");

  if(targetNode.length > 0)
  {
	// Options for the observer (which mutations to observe)
	var config = { attributes: false, childList: true, subtree: true };
	// Create an observer instance linked to the callback function
	var observer = new MutationObserver(callback);

	// Start observing the target node for configured mutations
	observer.observe(targetNode[0], config);
  }

}

window.onload = setObserver();
