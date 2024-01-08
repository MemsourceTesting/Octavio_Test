//locate the entire list, and return all lists
function LocateListItems() 
{
	var listItems = [];
	listItems = document.body.getElementsByTagName('li');
	return listItems;
}

function CheckIfFirstInList(currentValue,previousValue)
{
	var elements = document.body.getElementsByClassName("Title");
	elements[0].innerHTML = "CheckIfFirst";
	
	return ((currentValue == 1 || currentValue == 'a' || (currentValue == 'i' && previousValue != 'h')) && previousValue != "NULL");
}

function NumberToRoman(num) 
{	
	var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
	for ( i in lookup ) {
			while ( num >= lookup[i] ) {
				roman += i;
				num -= lookup[i];
			}
		}
		return roman;
}

function RomanToNumber(str) 
{  
	var result = 0;
	// the result is now a number, not a string
	var decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
	var roman = ["M", "CM","D","CD","C", "XC", "L", "XL", "X","IX","V","IV","I"];
	for (var i = 0;i <= decimal.length;i++) {
		while (str.indexOf(roman[i]) === 0){
			//checking for the first characters in the string
			result += decimal[i];
			//adding the decimal value to our result counter
			str = str.replace(roman[i], '');
			//remove the matched Roman letter from the beginning
			}
	}
	return result;
}

//Determines Value of currentValue - 1 in its sequence
function DetermineValue(CurrentValue, PreviousValue, DecreaseBy)
{
	var elements = document.body.getElementsByTagName("h1");
	
	var newValue;
	
	if(typeof CurrentValue == "number")
	{
		//elements[0].innerHTML = "number";
		newValue = CurrentValue - DecreaseBy;
	}
	else if(typeof CurrentValue == "string")
	{
		elements[0].innerHTML = "is a string";
		if(CurrentValue != "i")
		{
			if(CurrentValue.length == 1)
			{
				elements[0].innerHTML = "letter";
				newValue = String.fromCharCode(CurrentValue.charCodeAt(0) - DecreaseBy);
			}
			else if(CurrentValue.length > 1)
			{
				elements[0].innerHTML = "romannumeral";
				var numericValue = RomanToNumber(CurrentValue) - DecreaseBy;
				newValue = NumberToRoman(numericValue);
			}
		}
		else if(CurrentValue == "i")
		{
			if(PreviousValue == "h")
			{
				elements[0].innerHTML = "letter";
				newValue = String.fromCharCode(CurrentValue.charCodeAt(0) - DecreaseBy);
			}
			else
			{
				elements[0].innerHTML = "romannumeral";
				var numValue = RomanToNumber(CurrentValue) - DecreaseBy;
				newValue = NumberToRoman(numValue);	
			}
		}
	}
	
	return newValue;
}

function IntendedPreviousValue(CurrentValue, PreviousValue)
{
	var intendedPreviousValue;

	//you assign h as the previous value because the only scenario you need a previous value is for i in an a-z sequence
	//Intended previous value will not be called for i in an roman numeral sequence. 
	var calculatedPreviousValue = DetermineValue(CurrentValue, "h", 1);
	
	return calculatedPreviousValue;
}

//go through the list and lower numbers accoding to hidden numbered bullets
function AdjustListNumbers()
{
	var elements = document.body.getElementsByClassName("Title");
	elements[0].innerHTML = "ran-beginning";

	var listDictionary = new Object();
	var previousValue = "NULL";
	
	var decreaseBy = 0;		//The number you decrease the following numbered bullets by n, n = number of hidden bullets before the current bullet
	
	var currentListItems = [];
	currentListItems = LocateListItems();	//all bullet points, including bullet points and ol
	
	currentListItems[0].style.display = 'none';
	currentListItems[8].style.display = 'none';
	
	var j;
	
	for(j = 0; j < currentListItems.length; j++)
	{		
		var currentValue = currentListItems[j].value;
				
		if(CheckIfFirstInList(currentValue, previousValue))
		{		
			listDictionary[previousValue] = decreaseBy;	
	
			decreaseBy = 0;
			
			previousValue = "NULL";
		}	
		else if((IntendedPreviousValue() != previousValue) && (previousValue != "NULL"))
		{
			previousValue = IntendedPreviousValue();
			decreaseBy = listDictionary[previousValue];
		}
		
		//elements[0].innerHTML = "loops ran: " + j;
		
		if(currentListItems[j].style.display == 'none')
		{
			//if bullet point hidden increase descreaseBy by one
			decreaseBy++;
			elements[0].innerHTML = "loops ran de: " + j;	
		}
		else
		{
			currentListItems[j].value = DetermineValue(currentValue, previousValue, decreaseBy);
			elements[0].innerHTML = "loops ran cu: " + j;
		}
		
		
		
		previousValue = currentValue;
	}
	
	elements[0].innerHTML = "ran-end";
	
}

//window.onload = AdjustListNumbers();