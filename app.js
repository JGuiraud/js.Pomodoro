$(document).ready(function(){

/* ------- classe Chrono ------- */
var counter, counter2, counter3;


function Chrono(currentTime, boucleCounter) {
    this.time = currentTime;
    this.boucle = boucleCounter;
    this.start = function(){
    clearInterval(counter);
    counter = setInterval(timer, 1000);
    clearInterval(counter2);
    timer();
    }
    this.startBreak = function(){
    clearInterval(counter);
    clearInterval(counter2);
    counter2 = setInterval(breakChrono, 1000);
    breakChrono();
    }
    this.bigBreak = function(){
    longBreak();
    }
    this.pause = function(){
    pause();
    }
    this.stop = function(){
    stop();
    }
    this.stopLong = function(){
    stopLongBreak();
    }
}

var Chronometre = new Chrono(5, 0);
var breakTime = new Chrono(6, 0);
var breakLong = new Chrono(10, 0)

/* ------- Bouttons ------- */
$("#pause").hide();
$("#reset").hide();

$("#start").click(function(){
    Chronometre.start();
    $("#start").hide();
    $("#pause").show();
})
$("#pause").click(function(){
    Chronometre.pause();
    breakTime.pause();
    $("#start").show();
    $("#pause").hide();
})
$("#stop").click(function(){
    Chronometre.stop();
    breakLong.stop();
    Chronometre.boucle = 0
    breakTime.boucle = 0
    $("#stop").show();
    $("#pause").hide();
    $("#start").show();
})
$("#reset").click(function(){
    $("#reset").hide();
    $("#start").show();
    $("#stop").show();
    breakLong.stop();
    breakLong.stopLong();

})

/* ------ timer -------- */
function timer(){
    console.log("timer = " + Chronometre.time)
    Chronometre.time -=1
    var minute = Math.floor((Chronometre.time)/60);
    var seconds = Chronometre.time - (minute*60);
        if (seconds<10) {
            seconds = "0" + seconds;
        }
        if (minute<10) {
            minute = "0" + minute;
        }
        if (Chronometre.time <= 0) {
            Chronometre.boucle += 1
            console.log("Chronometre boucle = " + Chronometre.boucle);
            Chronometre.startBreak();
            Chronometre.time = 5
                if (breakTime.boucle === 3 && Chronometre.boucle === 4){
                Chronometre.stop();
                counter3 = setInterval(longBreak, 1000);
                breakTime.bigBreak();
                breakTime.stop();
            }
        }
    $("#timer").html(minute + ":" + seconds);  
}

/* ------- break ------ */
function breakChrono(){
    $("#pause").hide();
    console.log("break = " + breakTime.time)
    breakTime.time -=1;
    var minute = Math.floor(breakTime.time/60);
    var seconds = breakTime.time - (minute*60);
        if (seconds<10) {
            seconds = "0" + seconds;
        }
        if (minute<10) {
            minute = "0" + minute;
        }
        if (breakTime.time <= 0) {
            $("#pause").show();
            breakTime.time = 6
            Chronometre.time = 5
            breakTime.boucle += 1
            $("#timer").html(minute + ":" + seconds);  
            console.log("breakTime boucle = " + breakTime.boucle);
            Chronometre.start();
        }
    $("#timer").html(minute + ":" + seconds);  
}

/* ----- longBreak ----- */
function longBreak(){
    breakLong.time -= 1;
    var minute = Math.floor(breakLong.time/60);
    var seconds = breakLong.time - (minute*60);
        if (seconds<10) {
            seconds = "0" + seconds;
        }
        if (minute<10) {
            minute = "0" + minute;
        }
        if (breakLong.time <= 0) {
            breakTime.boucle = 0;
            timer.boucle = 0;
            $("#stop").html("Reset");
            breakLong.stopLong();
        }
    $("#timer").html(minute + ":" + seconds);  
}

/* ------- pause --------*/
function pause (){
    clearInterval(counter);
    clearInterval(counter2);
}

/* ------- stop ------- */
function stop(){
    clearInterval(counter);
    clearInterval(counter2);
    Chronometre.time = 5;
    breakTime.time = 7;
    breakLong.time = 9;
    $("#timer").html("25:00");
}

/* ------ stop long Break ------ */
function stopLongBreak(){
    clearInterval(counter3);
    $("#timer").html("25:00");
    $("#pause").hide();
    // $("#play").show();
    $("#stop").show();
    $("#reset").hide();
}

});

