/* 
    Created by: Nigel Diaz
    Created on: July 11, 2021
    Last updated on: August 7, 2021
*/
//declaration of global variables
let score = 0;
let level = 0;
let points = 0;
const btnChoice1 = document.getElementById("btnChoice1");
const btnChoice2 = document.getElementById("btnChoice2");
const btnChoice3 = document.getElementById("btnChoice3");
const btnChoice4 = document.getElementById("btnChoice4");
const btnChoices = [btnChoice1, btnChoice2, btnChoice3, btnChoice4];
const btnNext = document.getElementById("btnNext");
const btnPlay = document.getElementById("btnPlay");
const timer = document.getElementById("timer");
const countdown = document.getElementById("countdown");
const selectMode = document.getElementById("selectMode");
const backgroundMusic = document.getElementById("backgroundMusic");
//default on page load
document.getElementById("play").style.display = "none"; 
document.getElementById("score").style.display = "none";
btnNext.style.display = "none";
btnPlay.onclick = play;
//declare questions object with object literals in an array
let questions = [
    {
        question: "Who is the real Mandarin?", 
        choices: {
            a: "Wenwu", 
            b: "Trevor Slattery", 
            c: "Aldrich Killian", 
            d: "Raza Hamidmi Al-Wazar"
        }, 
        answer: "Wenwu"
    }, 
    {
        question: "What alias did Natasha Romanoff/Black Widow use when "
            +"she first appeared in Iron Man 2 (2010)?", 
        choices: {
            a: "Natalia Shostakova", 
            b: "Natalie Rushman", 
            c: "Tatiana Sokolova", 
            d: "Marya Konn"
        }, 
        answer: "Natalie Rushman"
    },
    {
        question: "What is Quicksilver's real name?", 
        choices: {
            a: "Peter Lehnsherr", 
            b: "Ralph Bohner", 
            c: "Pietro Maximoff", 
            d: "Peter Maximoff"
        }, 
        answer: "Pietro Maximoff"
    },
    {
        question: "When did most of the events in Captain America: "
            +"The First Avenger (2011) take place?", 
        choices: {
            a: "1930s", 
            b: "1940s", 
            c: "1950s", 
            d: "1960s"
        }, 
        answer: "1940s"
    }, 
    {
        question: "Which movie did Phil Coulson not appear in?", 
        choices: {
            a: "Iron Man (2008)", 
            b: "Captain Marvel (2019)", 
            c: "The Avengers (2012)", 
            d: "Spider-Man: Homecoming (2017)"
        }, 
        answer: "Spider-Man: Homecoming (2017)"
    }, 
    {
        question: "In Spider-Man: Far from Home (2019), Nick Fury "+
            "was actually whom of the following?", 
        choices: {
            a: "Loki", 
            b: "Sylvie", 
            c: "Talos", 
            d: "Mystique"
        }, 
        answer: "Talos"
    }, 
    {
        question: "Which realm is Thor Odinson originally from?", 
        choices: {
            a: "Asgard", 
            b: "Midgard", 
            c: "Vanaheim", 
            d: "Jotunheim"
        }, 
        answer: "Asgard"
    }, 
    {
        question: "In Thor: Ragnarok (2017), what event triggered Hela's "
            +"return from imprisonment?", 
        choices: {
            a: "The Convergence", 
            b: "A Nexus event", 
            c: "The death of Frigga", 
            d: "The death of Odin"
        }, 
        answer: "The death of Odin"
    }, 
    {
        question: "In WandaVision (2021), Agatha Harkness told Wanda that there's "
            +"an entire chapter devoted to her in which of the following books?", 
        choices: {
            a: "The Book of the Vishanti", 
            b: "The Book of Cagliostro", 
            c: "The Darkhold", 
            d: "The Necronomicon"
        }, 
        answer: "The Darkhold"
    }, 
    {
        question: "Who replaced J.A.R.V.I.S in the end of Avengers: Age of Ultron (2015)?", 
        choices: {
            a: "H.O.M.E.R.", 
            b: "F.R.I.D.A.Y.", 
            c: "Karen", 
            d: "E.D.I.T.H."
        }, 
        answer: "F.R.I.D.A.Y."
    }, 
    {
        question: "Where did Sharon Carter go after the events of Captain "
            +"America: Civil War (2016)?", 
        choices: {
            a: "Sokovia", 
            b: "Wakanda", 
            c: "Tokyo", 
            d: "Madripoor"
        }, 
        answer: "Madripoor"
    }, 
    {
        question: "What type of doctor is Doctor Stephen Strange?", 
        choices: {
            a: "Quack Doctor", 
            b: "Ophthalmologist", 
            c: "Neurosurgeon", 
            d: "Dermatologist"
        }, 
        answer: "Neurosurgeon"
    },
    {
        question: "In Black Panther (2018), what type of energy does T'Challa's "
            +"new suit absorb and reuse?", 
        choices: {
            a: "Kinetic energy", 
            b: "Thermal energy", 
            c: "Electrical energy", 
            d: "Radiant energy"
        }, 
        answer: "Kinetic energy"
    }, 
    {
        question: "In Ant-Man (2015), when Scott first asked Hank what he needed "+
            "him to do, what did Hank tell him?", 
        choices: {
            a: "\"It's not about saving our world. It's about saving THEIRS.\"", 
            b: "\"I want you to break into a place and steal some shit.\"", 
            c: "\"Scott, I need you to be the Ant-Man.\"", 
            d: "\"You don't have to raise your hand Scott.\""
        }, 
        answer: "\"I want you to break into a place and steal some shit.\""
    }
];
//shuffle questions array
questions = shuffleQuestions(questions);

btnNext.onclick = next;
//shuffles elements in a passed array and returns new array
function shuffleQuestions(array) {
    var swap = array.length, temp, index;
    while (swap > 0) {
        index = Math.floor(Math.random() * swap);
        swap--;
        temp = array[swap];
        array[swap] = array[index];
        array[index] = temp;
    }
    return array;
}
//highlights answer selected if correct
function correct(answer) {
    answer.style.color = "green";
    answer.style.backgroundColor = "#b6fccc";
    endLevel();
}
//highlights answer selected if wrong
function wrong(answer) {
    answer.style.color = "red";
    answer.style.backgroundColor = "#ffc9c9";
    endLevel();    
}
//ends level and disables buttons
function endLevel() {
    btnChoice1.disabled = true;
    btnChoice2.disabled = true;
    btnChoice3.disabled = true;
    btnChoice4.disabled = true;
    btnChoice1.onmouseover = null;
    btnChoice2.onmouseover = null;
    btnChoice3.onmouseover = null;
    btnChoice4.onmouseover = null;
    btnNext.style.display = "block";
}
//resets buttons for next level
function reset() {
    btnChoices.forEach(function(choice) {
        choice.style.color = null;
        choice.style.backgroundColor = null;
    });
    btnChoice1.disabled = false;
    btnChoice2.disabled = false;
    btnChoice3.disabled = false;
    btnChoice4.disabled = false;
    btnNext.style.display = "none";
}
//event listener for next button
function next() {
    reset();

    if(level < questions.length) {
        play();
    } 
    else {
        displayScore();
    }
}
let timerSeconds = 0;
//timer is set to 10 seconds from current time
function setTimer() {
    timerSeconds = new Date();
    timerSeconds.setSeconds(timerSeconds.getSeconds()+11);
    timerSeconds = timerSeconds.getTime();
}
//timer starts to count down
function startTimer() {
    setTimer();
    setInterval(function() {    
        let currentTime = new Date().getTime();
        let countdownTime = timerSeconds - currentTime;
        var seconds = Math.floor((countdownTime % (1000 * 60)) / 1000);
        countdown.innerHTML = seconds;

        if (countdownTime < 1) { 
            countdown.innerHTML = "&#8987;";
            endLevel();

        }
    }, 1000);
}

//event listener for play button
function play() {
    backgroundMusic.play();
    document.getElementById("menu").style.display = "none"; 
    document.getElementById("play").style.display = "block"; 

    if (selectMode.selectedIndex === 0) {
        countdown.innerHTML = "&infin;";
        countdown.style.fontSize = "45px";
        //countdown.style.paddingBottom = "5px";
        questions = questions.slice(0, 5);
        points = 20;        

    } else if (selectMode.selectedIndex === 1) {
        countdown.innerHTML = 10;
        questions = questions.slice(0, 10);
        points = 10;
        startTimer();

    } else if (selectMode.selectedIndex === 2) {
        countdown.innerHTML = 10;
        questions = questions.slice(0, 10);
        points = 10;

    }

    document.getElementById("question").innerHTML = (level+1)+") "+questions[level].question;
    btnChoice1.innerHTML = questions[level].choices.a;
    btnChoice2.innerHTML = questions[level].choices.b;
    btnChoice3.innerHTML = questions[level].choices.c;
    btnChoice4.innerHTML = questions[level].choices.d;

    btnChoices.forEach(function(choice) {
        if(choice.innerHTML === questions[level].answer) {
            choice.onclick = function() {
                choice.style.color = "green";
                choice.style.backgroundColor = "#b6fccc";
                score += points;
                endLevel();
            }            
        } else {
            choice.onclick = function() {
                choice.style.color = "red";
                choice.style.backgroundColor = "#ffc9c9";
                endLevel();
            }
            
        }
    });
   
    level++;      
}
//score is displayed 
function displayScore() {
    document.getElementById("play").style.display = "none"; 
    document.getElementById("score").style.display = "block";  
    document.getElementById("points").innerHTML = score;

}

