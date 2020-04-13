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
  	for (var i = 0; i < curData.length; i++) {
		addEntry(bodyElement,i);
	}
}

window.addEventListener('DOMContentLoaded', startSystem);