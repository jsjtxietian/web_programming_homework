// 1552629 xietian hw3

"use strict";

var frameSets; // a array of words
var currentFrame;   //index of current word
var delay;      //delay set by user
var intervalId; //used to stop and reset setInterval 

//init
window.onload = () => {
    document.getElementById("start").onclick = startIt;
    document.getElementById("stop").onclick = stopIt;

    document.getElementById("speedSet").onchange = setSpeed;

    var sizeSet = document.getElementsByName("fontSize");
    for (let s = 0; s < sizeSet.length; s++) {
        sizeSet[s].onclick = setSize;
    }

    delay = 171;
    currentFrame = 0;
}

//start the animation
//bind to the button Start
const startIt = () => {
    document.getElementById("stop").disabled = false;
    document.getElementById("start").disabled = true;

    let text = document.getElementById("input").value;
    var tempText = text.trim().split(/[\n\t ]/);

    for (let i = 0; i < tempText.length; i++) {
        let word = tempText[i];
        if (word[word.length - 1].match(/[,.:;?!]/)){
            word = word.substring(0,word.length-1);
            tempText.splice(i,1,word,word);
        }
    }

    frames = tempText;
    intervalId = setInterval(showCurrentFrame, delay);
}

//stop the animation
//bind to the button Stop
//stop doesn't change currentFrame in case to recover
const stopIt = () => {
    clearInterval(intervalId);
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
    document.getElementById("center").innerHTML = '';
}

//set the animation speed by choosing from a drop-down list of speeds 
//bind to onchange function of Speed:
const setSpeed = () => {
    const obj = document.getElementById("speedSet");
    var index = obj.selectedIndex;
    var value = obj.options[index].value;

    delay = value;

    clearInterval(intervalId);
    intervalId = setInterval(showCurrentFrame,delay);
}

//set the font size by choosing medium , big or bigger 
//bind to onclick of Size:
function setSize() {
    document.getElementById("center").style.fontSize = this.value;
}

//show the current frame
//if is over , stop it
//else increase currentFrame and change html
const showCurrentFrame = () => {
    if (currentFrame > frames.length - 1) {
        clearInterval(intervalId);
        stopIt();
        currentFrame = 0;
        return ;
    }
    document.getElementById("center").innerHTML = frames[currentFrame++];
}
