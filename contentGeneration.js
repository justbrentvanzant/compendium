var DATA_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ93EFt3fS0D7L_2W1WlCFzFqrbdPHTIqIXJQdx8IwEAlitCykPhOJdAhc19J-pavWW6x95FNzXFz6L/pubhtml';
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
  curData = artifactData;
}

function addEntry(bodyElement,dataId) {
	var newDiv = document.createElement("div"); 
	var nameSpan = document.createElement("span"); 
	var dateSpan = document.createElement("span");
	var aTag = document.createElement("a");
	
	dateSpan.innerHTML = currData[dataId].date;	
	aTag.innerHTML = currData[dataId].contentName;
	aTag.href = currData[dataId].contentLink;
	aTag.target = "_blank";
	
	//add classes
	dateSpan.classList.add('date');
	nameSpan.classList.add('name');
	
	//append elements
	nameSpan.appendChild(aTag);
	newDiv.appendChild(nameSpan);
	newDiv.appendChild(dateSpan);
	bodyElement.appendChild(newDiv);
}

function renderData(bodyElement){
	while (bodyElement.firstChild) {
    	bodyElement.removeChild(bodyElement.firstChild);
  	}
  	for (var i = 0; i < currData.length; i++) {
		if (typeName != "intern" || typeName == "") {
			addEntry(bodyElement,i);
		}
	}
}

window.addEventListener('DOMContentLoaded', startSystem);