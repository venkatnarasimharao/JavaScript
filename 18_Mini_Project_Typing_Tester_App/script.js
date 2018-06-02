var textAreaBorder = document.querySelector("#text-area");
var textArea = document.querySelector("#text-area");
var originalText = document.querySelector(".text-section-div p").innerHTML;
var resetButton = document.querySelector("#reset");
var theTimer = document.querySelector(".timer");
var congSection=document.querySelector('.cong-section');

var timer=0;
var minutes=0;
var seconds=0;
var milliSeconds=0;
var currentTime='';

var interVal = 0;
var timerRunning = false;

// Add leading zero to numbers 9 or below:
function leadingzero(time) {
    if (time<=9){
        return "0"+time;
    }
    else {
        return time;
    }
}

// Run a standard minute/second/hundredths timer:
//minutes = Math.floor((timer/100)/60);
//seconds = Math.floor((timer/100) - (minutes * 60));
//milliSeconds = Math.floor(timer- (seconds * 100) - (minutes * 6000));
function startTimer() {
    minutes = Math.floor((timer/100)/60);
    seconds = Math.floor((timer/100) - (minutes * 60));
    milliSeconds = Math.floor(timer - (seconds * 100) - (minutes * 6000));

    minutes=leadingzero(minutes);
    seconds=leadingzero(seconds);
    milliSeconds=leadingzero(milliSeconds);

    currentTime= minutes+ ':' +seconds+ ':' +milliSeconds;

    theTimer.innerHTML=currentTime;
    timer++;
}
// Match the text entered with the provided text on the page:
function spellcheck() {
    var textEntered = textArea.value;
    var partialText = originalText.substring(0,textEntered.length);

    if (textEntered === originalText){
        textAreaBorder.style.borderColor = 'green';
        clearInterval(interVal); //stop timer
        congSection.style.display='block';
    }
    else {
        if (textEntered == partialText){
            textAreaBorder.style.borderColor= 'lightgreen';
        }
        else {
            textAreaBorder.style.borderColor= 'red';
        }
    }
}
// Start the timer:
function start() {
    var textEnteredLenght = textArea.value.length;
    if (textEnteredLenght===0 && !timerRunning){
        //start the timer
        interVal=setInterval(startTimer,10);
        timerRunning= true;   //to not to run timer
    }
}
// Reset everything:
function reset() {
    clearInterval(interVal);
    timer=0;
    minutes=0;
    seconds=0;
    milliSeconds=0;
    currentTime='';

    interVal = 0;
    timerRunning = false;

    theTimer.innerHTML='00:00:00'; //to get timer empty
    textArea.value= '';       //to get text empty
    textAreaBorder.style.borderColor='grey';
    congSection.style.display='none';
}
// Event listeners for keyboard input and the reset button:
textArea.addEventListener('keypress',start);
textArea.addEventListener('keyup',spellcheck);

resetButton.addEventListener('click',reset);  //to reset button