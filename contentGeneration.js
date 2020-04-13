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

function filterData(data) {
	data = extrapolateData(data);
	data.sort(helperCompare);
	data.reverse();
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

function renderData(bodyElement){
	console.log(curData);
	while (bodyElement.firstChild) {
    	bodyElement.removeChild(bodyElement.firstChild);
  	}
  	for (var i = 0; i < curData.length; i++) 
		if (curData[i].isEntry == true) {
			addEntry(bodyElement,i);
		}
	}
}

window.addEventListener('DOMContentLoaded', startSystem);