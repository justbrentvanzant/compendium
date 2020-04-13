var DATA_URL = 'https://docs.google.com/spreadsheets/d/1UNWj9Pq2esRlyXtp4trN9058K5n1J8XhsgYlzk8ngPo/edit?usp=sharing';
var artifactData;
var curData;
var isOrdered = false;

function startSystem(){
  initSystem();
}
//initializes reading and render of event info
function initSystem() {
  Tabletop.init( { key: DATA_URL,
                   callback: displayGeneralInfo,
                   simpleSheet: true } )
}

function displayGeneralInfo(data, tabletop) {
  storeData(data);
  var body = document.getElementById("contentHolding");
  renderData(body);
}
function storeData(data){
  artifactData = data;
  curData = filterData(artifactData);
}

/*helper function to compare to date objects
 */
function helperCompare(a, b) {
  if (a.year > b.year) {
	  return 1;  
  }
  if (a.year < b.year) {
	  return -1;
  }
  if (a.monthNum < b.monthNum) {
	  return -1;
  }
  if (a.monthNum > b.monthNum) {
	  return 1;
  }
  if (a.dateNum < b.dateNum) {
	  return -1;
  }
  if (a.dateNum > b.dateNum) {
	  return -1;
  }
  return 0;
}

function extrapolateData(data) {
	for (var i = 0; i < data.length; i++) {
		var monthNum = 0; 
		var monthString = data[i].month;
		monthString = monthString.toLowerCase();
		if (monthString == "january") {
		   monthNum = 1;
		}
		else if (monthString == "february") {
		   monthNum = 2;
		}
		else if (monthString == "march") {
		   monthNum = 3;
		}
		else if (monthString == "april") {
		   monthNum = 4;
		}
		else if (monthString == "may") {
		   monthNum = 5;
		}
		else if (monthString == "june") {
		   monthNum = 6;
		}
		else if (monthString == "july") {
		   monthNum = 7;
		}
		else if (monthString == "august") {
		   monthNum = 8;
		}
		else if (monthString == "september") {
		   monthNum = 9;
		}
		else if (monthString == "october") {
		   monthNum = 10;
		}
		else if (monthString == "november") {
		   monthNum = 11;
		}
		else if (monthString == "december") {
		   monthNum = 12;
		}
		data[i].dateNum = data[i].date.replace(/\D/g,'');
		data[i].monthNum = monthNum;
		data[i].isEntry = true;
	}
	return data;
}
function addSpacers(data) {
	var currentYear = 9000;
	var currentMonthNum = 0;
	for (var i = 0; i < data.length; i++) {
		if (data[i].year < currentYear) {
			currentYear = data[i].year;
			currentMonthNum = data[i].monthNum;
			var newObj = {};
			newObj.year = currentYear;
			newObj.month = data[i].month;
			newObj.isEntry = false;
			data.splice( i, 0, newObj); 
			i++;
		}
		else if (currentMonthNum < data[i].monthNum) {
			currentMonthNum = data[i].monthNum;
			var newObj = {};
			newObj.year = -1;
			newObj.monthNum = currentMonthNum;
			newObj.isEntry = false;
			if (currentMonthNum == 1) {
				newObj.month = "January";
			}
			else if (currentMonthNum == 2) {
			   newObj.month = "February";
			}
			else if (currentMonthNum == 3) {
			  newObj.month = "March";
			}
			else if (currentMonthNum == 4) {
			  newObj.month = "April";
			}
			else if (currentMonthNum == 5) {
			   newObj.month = "May";
			}
			else if (currentMonthNum == 6) {
			   newObj.month = "June";
			}
			else if (currentMonthNum == 7) {
			  newObj.month = "July";
			}
			else if (currentMonthNum == 8) {
			 newObj.month = "August";
			}
			else if (currentMonthNum == 9) {
			   newObj.month = "September";
			}
			else if (currentMonthNum == 10) {
			  newObj.month = "October";
			}
			else if (currentMonthNum == 11) {
			   newObj.month = "November";
			}
			else if (currentMonthNum == 12) {
			  newObj.month = "December";
			}
			data.splice( i, 0, newObj); 
			i++;
		}
	}
	return data;
}
function filterData(data) {
	data = extrapolateData(data);
	data.sort(helperCompare);
	data.reverse();
	data = addSpacers(data);
	return data;
}
function addEntry(bodyElement,dataId) {
	var newDiv = document.createElement("div"); 
	var nameSpan = document.createElement("span"); 
	var dateSpan = document.createElement("span");
	var aTag = document.createElement("a");
	
	dateSpan.innerHTML = curData[dataId].date;	
	aTag.innerHTML = curData[dataId].contentName;
	aTag.href = curData[dataId].contentLink;
	aTag.target = "_blank";
	
	//add classes
	dateSpan.classList.add('date');
	nameSpan.classList.add('name');
	newDiv.classList.add('entry');
	newDiv.classList.add(curData[dataId].contentType);
	
	//append elements
	nameSpan.appendChild(aTag);
	newDiv.appendChild(nameSpan);
	newDiv.appendChild(dateSpan);
	bodyElement.appendChild(newDiv);
}

function addHeader(bodyElement,dataId) {
	var newHeader = document.createElement("h1"); 
	var monthSpan = document.createElement("span"); 
	var yearSpan = document.createElement("span");
	
	monthSpan.innerHTML = curData[dataId].month;	
	if (  curData[dataId].year != -1) {
		yearSpan.innerHTML = curData[dataId].year;
	}
	
	//add classes
	monthSpan.classList.add('month');
	yearSpan.classList.add('year');
	
	newHeader.classList.add('time');
	
	//append elements
	newHeader.appendChild(monthSpan);
	newHeader.appendChild(yearSpan);
	bodyElement.appendChild(newHeader);
}

function renderData(bodyElement){
	console.log(curData);
	while (bodyElement.firstChild) {
    	bodyElement.removeChild(bodyElement.firstChild);
  	}
  	for (var i = 0; i < curData.length; i++) {
		if (curData[i].isEntry == true) {
			addEntry(bodyElement,i);
		}
		else {
			addHeader(bodyElement,i);
		}
	}
}

window.addEventListener('DOMContentLoaded', startSystem);