const timeDisplay = document.getElementById('currentDay');
const timeEl = document.querySelectorAll('.description');
const rowEl = document.querySelectorAll('.row');
const buttonEl = document.querySelectorAll('.saveBtn')


function displayTime() {
    let currentDate = moment().format('MMMM Do YYYY');
    timeDisplay.innerText = currentDate;
    displayItems();
}

function colourCode () {
    let currentTime = moment().format("H");  

    for(let i = 0; i < timeEl.length; i++) {
        if(parseInt(timeEl[i].dataset['time']) < currentTime) {
            $(rowEl[i]).attr('id', 'past');
        }
        else if(parseInt(timeEl[i].dataset['time']) == currentTime) {
            $(rowEl[i]).attr('id', 'present');
        }
        else {
            $(rowEl[i]).attr('id', 'future');
        }
    }
}
function addItem(dataId) {
    let itemValue = rowEl[dataId-9].value;
    if(itemValue === null) {
        localStorage.clear;
    }
    else {
        localStorage.setItem("toDo" + dataId, itemValue);
    }
}

function displayItems() {
    for(let i = 0; i < timeEl.length; i++) {
        let itemValue = localStorage.getItem("toDo"+(i+9));
        if(itemValue != undefined) {
            $(rowEl[i]).attr('value', itemValue);
        }
    }
}

$("button").click(function(event) {
    event.preventDefault();
    let dataId = parseInt($(this).attr("data-btn"));
    addItem(dataId);
  });

colourCode();
displayTime();