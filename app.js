$(document).ready(function(){

/* ------- classe Chrono ------- */
var counter, counter2, counter3;
var buzzer = $("#buzzer")[0];

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

var Chronometre = new Chrono(1501, 0);
var breakTime = new Chrono(301, 0);
var breakLong = new Chrono(901, 0)

/* ------- Bouttons ------- */
$("#pause").hide();
$("#reset").hide();
$("#breaktime").hide();
$("#megabreak").hide();


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
    $("#megabreak").hide();
    $("#sessiontitle").show();

})
$("#reset").click(function(){
    $("#reset").hide();
    $("#start").show();
    $("#stop").hide();
    $("#sessiontitle").show();
    $("#megabreak").hide();
    Chronometre.boucle = 0
    breakTime.boucle = 0
    breakLong.stop();
    breakLong.stopLong();


})

/* ------ timer -------- */
function timer(){
    $("#sessiontitle").show();
    $("#breaktime").hide();

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
			buzzer.play();
            Chronometre.boucle += 1
            console.log("Chronometre boucle = " + Chronometre.boucle);
            Chronometre.startBreak();
            Chronometre.time = 1500
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
    $("#sessiontitle").hide();
    $("#breaktime").show();
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
			buzzer.play();
            $("#pause").show();
            breakTime.time = 1501
            Chronometre.time = 301
            breakTime.boucle += 1
            console.log("breakTime boucle = " + breakTime.boucle);
            Chronometre.start();
        }
    $("#timer").html(minute + ":" + seconds);  
}

/* ----- longBreak ----- */
function longBreak(){
    $("#breaktime").hide();
    $("#megabreak").show();
    $("#stop").hide();
    $("#reset").show();
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
    Chronometre.time = 1501;
    breakTime.time = 301;
    breakLong.time = 901;
    $("#timer").html("25:00");
}

/* ------ stop long Break ------ */
function stopLongBreak(){
    clearInterval(counter3);
    $("#timer").html("25:00");
    $("#pause").hide();
    $("#stop").show();
    $("#reset").hide();
}

});

