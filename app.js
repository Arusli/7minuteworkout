//Selectors
const clock = document.getElementById('clock');
const rest = document.getElementById('rest');
const timer = document.getElementById('timer');
const exercise = document.getElementById('exercise');
const startButton = document.getElementById('start-button');
const body = document.getElementById('body');
const mobileButton = document.getElementById('mobile-only-button');

//audio library

var nextUp = new Audio();
nextUp.src = "sounds/nextup.mp3";
var inSound = new Audio();
inSound.src = "sounds/in.mp3";
var three = new Audio();
three.src = "sounds/three.mp3";
var two = new Audio();
two.src = "./sounds/two.mp3";
var one = new Audio();
one.src = "./sounds/one.mp3";
var bell = new Audio();
bell.src = "./sounds/bell.mp3";
var blip = new Audio();
blip.src = "./sounds/blip.mp3"
blip.volume = .4;
var endBell= new Audio();
endBell.src = "./sounds/endbell.mp3"
endBell.volume = .4;
var whatAWorkout = new Audio();
whatAWorkout.src = "./sounds/whataworkout.mp3"
var jumpingJacks = new Audio();
jumpingJacks.src = "./sounds/jumpingjacks.mp3";
var wallSits = new Audio();
wallSits.src = "./sounds/wallsits.mp3";
var pushups = new Audio();
pushups.src = "./sounds/pushups.mp3";
var crunches = new Audio();
crunches.src = "./sounds/crunches.mp3";
var chairSteps = new Audio();
chairSteps.src = "./sounds/chairstepups.mp3";
var squats = new Audio();
squats.src = "./sounds/squats.mp3";
var dips = new Audio();
dips.src = "./sounds/tricepsdips.mp3";
var planks = new Audio();
planks.src = "./sounds/planks.mp3";
var highKnees = new Audio();
highKnees.src = "./sounds/highknees.mp3";
var lunges = new Audio();
lunges.src = "./sounds/lunges.mp3";
var pushupsRotation = new Audio();
pushupsRotation.src = "./sounds/pushupswithrotation.mp3";
var sideplanks1 = new Audio();
sideplanks1.src = "./sounds/sideplanks1.mp3";
var sideplanks2 = new Audio();
sideplanks2.src = "./sounds/sideplanks2.mp3";


//iOS sound workaround text
function prepareSounds() {
    muteSounds();
    playAllSounds();
    setTimeout(playNextUp, 1000);
    setTimeout(playJumpingJacks, 3000);
    setTimeout(unmuteSounds, 5500);
    mobileButton.removeAttribute('onclick');
}

function playNextUp() {
    nextUp.play();
}

function playJumpingJacks() {
    jumpingJacks.play();
}

function muteSounds() {
    for (i=0;i<completeAudioArray.length;i++) {
        completeAudioArray[i].muted = true;
    }
}

function unmuteSounds() {
    for (i=0;i<completeAudioArray.length;i++) {
        completeAudioArray[i].muted = false;
    }   
}

function playAllSounds() {
    for (i=0;i<completeAudioArray.length;i++) {
        completeAudioArray[i].play();
    }
}
//

//audio array
const audioArray = [jumpingJacks, wallSits, pushups, crunches, chairSteps, squats, dips, planks, highKnees, lunges, pushupsRotation, sideplanks1, sideplanks2];
const completeAudioArray = [inSound, three, two, one, bell, blip, endBell, whatAWorkout, wallSits, pushups, crunches, chairSteps, squats, dips, planks, highKnees, lunges, pushupsRotation, sideplanks1, sideplanks2];
//complete minus nextUp and jumpingJacks

//EXERCISES (13 total)
const exerciseArray = ['Jumping Jacks', 'Wall Sits ', 'Pushups', 'Crunches', 'Chair Step-ups', 'Squats', 'Triceps Dips', 'Plank', 'High Knees', 'Lunges', 'Pushups with Rotation', 'Side Plank 1', 'Side Plank 2'];
exerciseCounter = 0;

//clock variables (global)
let runTime = 0;
//clock
let seconds = 0;
let tensOfSeconds = 0;
let minutes = 0;
let tensOfMinutes = 0;
//rest
let restSeconds = 0;
let restTensOfSeconds = 1;
//timer
let timerSeconds = 0;
let timerTensOfSeconds = 3;

//color
const alphabet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'b', 'c', 'd', 'e', 'f'];
let colorize;

//STATE Variables
let state = 'paused'; // vs play vs over
let workoutState = 'rest' // vs timer vs over

//click listener
mobileButton.addEventListener('click', function() {
    if (state === 'paused' && workoutState === 'rest') {
        state = 'play';
        body.style.backgroundColor = 'white';
        mobileButton.style.backgroundColor = '#32cd32';
        mobileButton.innerHTML = 'Playing';
        startClock();
        startRest();
    } else if (state === 'paused' && workoutState === 'timer') {
        state = 'play';
        body.style.backgroundColor = 'white';
        mobileButton.style.backgroundColor = '#32cd32';
        mobileButton.innerHTML = 'Playing';
        startClock();
        startTimer();
    } else if (state === 'play') {
        state = 'paused';
        body.style.backgroundColor = 'lightgrey';
        mobileButton.style.backgroundColor = 'red';
        mobileButton.innerHTML = 'Paused';
    }
//     //I noticed that when i pause the clock the numbers keep going for 1 more second.
//     //I believe this is because even though I clear the interval, the current interval iteration
//     //still completes. Can I fix this buy moving the display change to before clear interval?
//     //No it didnt seem to work. Maybe I could make the display time function separate from time changing function.
})

//spacebar listener
document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        if (state === 'paused' && workoutState === 'rest') {
            state = 'play';
            body.style.backgroundColor = 'white';
            // console.log(state);
            startButton.style.backgroundColor = '#32cd32';
            startButton.innerHTML = 'Playing (spacebar)';
            startClock();
            startRest();
        } else if (state === 'paused' && workoutState === 'timer') {
            state = 'play';
            startColor();
            body.style.backgroundColor = 'white';
            // console.log(state);
            startButton.style.backgroundColor = '#32cd32';
            startButton.innerHTML = 'Playing (spacebar)';
            startClock();
            startTimer();
        } else if (state === 'play') {
            state = 'paused';
            stopColor();
            body.style.backgroundColor = 'lightgrey';
            startButton.style.backgroundColor = 'red';
            startButton.innerHTML = 'Paused (spacebar)';
            // console.log(state);
        }
     }
})

//Program






//FUNCTIONS

//coloring

function generateHexcolor() {
    let color = '#';
    let randomInt = function() {
        return Math.floor(Math.random() * 16)
    }
    for (i = 0; i<6; i++) {
        color += alphabet[randomInt()];
    }
    exercise.style.color = color;
}

function startColor() {
    colorize = setInterval(generateHexcolor, 250);
}

function stopColor() {
    clearInterval(colorize);
}

//exercises
function displayExercise() {
    exerciseSelection = exerciseArray[exerciseCounter];
    exercise.innerHTML = (exerciseCounter + 1) + '. ' + exerciseSelection;
}

function highlightRest() {
    stopColor();
    timer.style.color = 'white';
    timer.style.backgroundColor = 'grey';
    timer.style.fontSize = '1.5rem';
    timer.style.flex = '1';
    rest.style.color = 'white';
    rest.style.backgroundColor = 'purple';
    rest.style.fontSize = '2.5rem';
    rest.style.flex = '2';
}

function highlightTimer() {
    startColor();
    timer.style.color = 'white';
    timer.style.backgroundColor = 'purple';
    timer.style.fontSize = '2.5rem'
    timer.style.flex = '2'
    rest.style.color = 'white';
    rest.style.backgroundColor = 'grey';
    rest.style.fontSize = '1.5rem'
    rest.style.flex = '1';
}

function displayRest() {
    rest.innerHTML = 'REST 00:' + restTensOfSeconds + restSeconds;
}

function displayTimer() {
    timer.innerHTML = 'TIMER 00:' + timerTensOfSeconds + timerSeconds;
    
}

function resetRest() {
    highlightRest();
    workoutState = 'rest';
    restTensOfSeconds = '1';
    restSeconds = '0';
    displayRest();
}

function resetTimer() {
    highlightTimer();
    workoutState = 'timer';
    timerTensOfSeconds = '3';
    timerSeconds = '0';
    displayTimer();
}

function updateExercise() { //sets interval amount for counter
    exerciseCounter ++;
    displayExercise();
}

function end() {
    endBell.play();
    whatAWorkout.play();
    state = 'over'; //disables play button
    workoutState = 'over'; //disables swapping between timer and rest
    exercise.innerHTML = 'Finished!';
}
//


//rest
function startRest() {

    var restInterval = setInterval(function() {
        if (state === 'paused') {
            clearInterval(restInterval);
        }
        if (restSeconds + restTensOfSeconds > 0) {
            restSeconds --;
        }
        if (restSeconds < 0 && restTensOfSeconds > 0) {
            restSeconds = 9;
            restTensOfSeconds --;
        }

        if (restSeconds === 9 && restTensOfSeconds === 0) {
            nextUp.play();
        }
        if (restSeconds === 7 && restTensOfSeconds === 0) {
            audioArray[exerciseCounter].play();
        }
        if (restSeconds === 4 && restTensOfSeconds === 0) {
            inSound.play();
        }
        if (restSeconds === 3 && restTensOfSeconds === 0) {
            three.play();
        }
        if (restSeconds === 2 && restTensOfSeconds === 0) {
            two.play();
        }
        if (restSeconds === 1 && restTensOfSeconds === 0) {
            one.play();
        }

        if (restSeconds <= 0 && restTensOfSeconds <= 0) {
            clearInterval(restInterval);
            bell.play();
            resetTimer();
            startTimer();
        }

        displayRest();
    }, 1000);
}


//timer
function startTimer() {
  
    var timerInterval = setInterval(function(){
        if (state === 'paused') {
            clearInterval(timerInterval);
        }

        if (timerSeconds + timerTensOfSeconds > 0) {
            timerSeconds --;
        }
        
        if (timerSeconds < 0) {
            timerSeconds = 9;
            timerTensOfSeconds --;
        }

        if (timerSeconds <= 3 && timerSeconds > 0 && timerTensOfSeconds === 0) {
            blip.play();
        } 
       
        if (timerSeconds === 0 && timerTensOfSeconds === 0 && exerciseCounter < 12) {
            clearInterval(timerInterval);
            endBell.play();
            updateExercise();
            resetRest();
            startRest();
        } else if (timerSeconds === 0 && timerTensOfSeconds === 0 && exerciseCounter >= 12) {
            clearInterval(timerInterval);
            end();
        }
           
       displayTimer();

    }, 1000)
}


// clock
// EDIT: We will need to separate the exercise display functions from the clock. 
//Exercise display needs to be linked with the TIMER periods/functions.
function startClock() {
    var clockInterval = setInterval(function(){ 

        runTime ++;
        seconds ++;

        if (state === 'paused') {
            clearInterval(clockInterval);
        }

        if (seconds > 9) {
            seconds = 0;
            tensOfSeconds ++;
        }

        if (tensOfSeconds > 5) {
            tensOfSeconds = 0;
            minutes ++;
        }

        clock.innerHTML = 'Clock ' + tensOfMinutes + minutes + ':' + tensOfSeconds + seconds;
    
    }, 1000);
}

