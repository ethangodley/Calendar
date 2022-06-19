const timeDisplay = document.getElementById('currentDay'); // creates variable that accesses HTML id 'currentDay'
const timeEl = document.querySelectorAll('.description'); // creates object variable that stores all elements containing 'description' class
const rowEl = document.querySelectorAll('.row'); // creates object variable that stores all elements containing 'row' class
const buttonEl = document.querySelectorAll('.saveBtn') // creates object variable that stores all elements containing 'savBtn' class

// function uses moment.js to retrieve local date, then stores date in variable and displays to user
function displayTime() {
    let currentDate = moment().format('MMMM Do YYYY'); // moment.js retrives local date and stores date in variable 'currentDate'
    timeDisplay.innerText = currentDate; // allows currentDate to be displayed in HTML
    displayItems(); // calls upon displayItems function
}

// function compares local time to each planner hour and determines whether planner hour is in the past, present, or future
function colourCode () {
    let currentTime = moment().format("H"); // uses moment.js to determine time in 24 hour format and stores in variable 'currentTime'

    for(let i = 0; i < timeEl.length; i++) { // for loop iterates from 0 to timeEl length executing code within whilst parameters met
        if(parseInt(timeEl[i].dataset['time']) < currentTime) { // if statement checks if planner hour has already past relative to local hour, executes code within if true
            $(rowEl[i]).attr('id', 'past'); // adds id=past to current element containing row class using jquery
        }
        else if(parseInt(timeEl[i].dataset['time']) == currentTime) { // if statement checks if planner hour is equal to local hour, executes code within if true
            $(rowEl[i]).attr('id', 'present'); // adds id=present to current element containing row class using jquery
        }
        else { // if other parameters from if and if else staement are not true, execute code within
            $(rowEl[i]).attr('id', 'future'); // adds id=future to current element containing row class using jquery
        }
    }
}
// function adds user input to local storage for future retrieval. Imports variable dataId to save correct input
function addItem(dataId) {
    let itemValue = rowEl[dataId-9].value; // sets variable itemValue to value of current rows user input
    if(itemValue === null) {  // if user input is null, clear storage
        localStorage.clear;
    }
    else { // if user input contains text save the text to local storage with title containing toDo with id number at the end
        localStorage.setItem("toDo" + dataId, itemValue);
    }
}
// function retrieves data from local storage and displays it to webpage
function displayItems() {
    for(let i = 0; i < timeEl.length; i++) { // execute code within for as long as 'i' is less than timeEl length
        let itemValue = localStorage.getItem("toDo"+(i+9)); // retrieves correct data from local storage using value of i + 9 as data-item begins a 9
        //stores data into variable itemValue
        if(itemValue != undefined) { // if itemvalue is not undefined execute code within
            $(rowEl[i]).attr('value', itemValue); // sets value of current rows input box to correct local storage value using jquery
        }
    }
}

// web page listens for user 'click' on a save button and exports the id of the button clicked to addItem function
$("button").click(function(event) {
    event.preventDefault(); // prevents default page refresh upon click
    let dataId = parseInt($(this).attr("data-btn")); // uses jquery to retrieve the id number of the button clicked and stores it in variable 'dataId' 
    addItem(dataId); // calls upon addItem function and exports 'dataId' with it
  });

colourCode(); // calls upon colorCode function
displayTime(); // calls upon displayTime function