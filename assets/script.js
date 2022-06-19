const timeDisplay = document.getElementById('currentDay');
const timeEl = document.querySelectorAll('.description');
const rowEl = document.querySelectorAll('.row');

console.log(timeEl);

function displayTime() {
    let currentDate = moment().format('MMMM Do YYYY');
    timeDisplay.innerText = currentDate;
}

function colourCode () {
    let currentTime = moment().format("14");  
    console.log(currentTime);

    for(let i = 0; i < timeEl.length; i++) {
        if(timeEl[i].dataset['time'] < currentTime) {
            $(rowEl[i]).attr('id', 'past');
        }
        else if(timeEl[i].dataset['time'] == currentTime) {
            $(rowEl[i]).attr('id', 'present');
        }
        else {
            $(rowEl[i]).attr('id', 'future');
        }
    }
}
colourCode();
displayTime();

