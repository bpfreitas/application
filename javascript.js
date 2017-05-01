//Now question is the dictionary item that is displayed at any given moment on the screen
let nowQuestion;

let timeID;

let index = 0;

let tenQs;

let numAnswered = 0;

let penalty = 0;

let finalTime = 0;

let totalSeconds = 0;

let namePlayer = "Joe Shmo";

let arraySpot;

let leaderBoard = [{
    name: "Joe Name",
    time: "3600"
  },
  {
    name: "Joe Name",
    time: "3600"
  },
  {
    name: "Joe Name",
    time: "3600"
  },
  {
    name: "Joe Name",
    time: "3600"
  },
  {
    name: "Joe Name",
    time: "3600"
  },
];

//These 4 lines of code merge the triviaQuestions.js with javascript.js
newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'triviaQuestions.js';
document.getElementsByTagName('head')[0].appendChild(newScript);

function generateQs() {
  let numQuestions = dict.length;
  let tenQs = [];
  let used = [];
  let i = 0;
  while (tenQs.length != 10) {
    //console.log("hi");
    let index = Math.floor(Math.random() * (numQuestions - 1));
    if (!used.includes(index)) {
      tenQs[i] = dict[index];
      used[i] = index;
      i++;
    } else {
      index = Math.floor(Math.random() * (numQuestions - 1));
    }
  }
  console.log(tenQs);
  console.log(used);
  return tenQs;
}

function scramble(quest) {
  let choices = [];
  choices[0] = quest.a;
  choices[1] = quest.b;
  choices[2] = quest.c;
  choices[3] = quest.d;
  return randomize(choices);
}

function randomize(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  console.log(array);
  return array;
}

function nextQuestion() {
  let q = tenQs[index];
  index += 1;
  console.log(q.question);
  return q;
}

//displays this question
function showQuestion() {

  //nowQuestion is the dict item that is displayed at this moment
  nowQuestion = nextQuestion();

  let choices = scramble(nowQuestion);
  console.log(numAnswered);
  //if (numAnswered == 5) {
    //alert("youve guessed 5");
  //}

  document.getElementById("question").innerHTML = nowQuestion.question;

  document.getElementById("divA").innerHTML = choices[0];
  document.getElementById("divB").innerHTML = choices[1];
  document.getElementById("divC").innerHTML = choices[2];
  document.getElementById("divD").innerHTML = choices[3];

  //document.getElementById("answer").innerHTML = "Answer is: " + nowQuestion.answer

  document.getElementById("divA").addEventListener("click", checkGuess);
  document.getElementById("divB").addEventListener("click", checkGuess);
  document.getElementById("divC").addEventListener("click", checkGuess);
  document.getElementById("divD").addEventListener("click", checkGuess);

  document.getElementById("divA").addEventListener("focus", flashColor);
  document.getElementById("divB").addEventListener("focus", flashColor);
  document.getElementById("divC").addEventListener("focus", flashColor);
  document.getElementById("divD").addEventListener("focus", flashColor);

  document.getElementById("divA").addEventListener("focusout", change);
  document.getElementById("divB").addEventListener("focusout", change);
  document.getElementById("divC").addEventListener("focusout", change);
  document.getElementById("divD").addEventListener("focusout", change);

}

function flashColor() {
  if (this.innerHTML != nowQuestion.answer){
    this.style.backgroundColor = "#d33f3f";
    this.setAttribute("name", "wrong");

  }
}

function change() {
  this.style.backgroundColor = "#57BC90";
  this.setAttribute("name", "");
}

function checkGuess() {
  console.log(this.innerHTML);
  if (this.innerHTML == nowQuestion.answer) {
    console.log("YOU GOT IT RIGHT, THE ANSWER IS " + this.innerHTML);
    numAnswered++;
    document.getElementById("counter").innerHTML = numAnswered + "/10";


    if (numAnswered == 10) {
      //setTimeout(alert("you're done!"), 5000);
      endGame();

    } else {
      document.getElementById("userMessage").innerHTML = "Your answer: " + this.innerHTML + " was right. Here's your next question:";
      showQuestion();
    }
  } else {
    console.log(this);
    var elem = document.activeElement;
    console.log(elem);
    //this.style.backgroundColor = "red";
    penalty += 5;
    totalSeconds += 5;
    setTimeout(flashRED, 50);
    //var flashID = setInterval(flashRED, 2000);
    setTimeout(changeBack, 1500);
    //clearInterval(flashID);
    console.log("YOU ARE WRONG");
    document.getElementById("userMessage").innerHTML = "Your answer: " + this.id + " was INCORRECT.";
  }

  //totalSeconds+=5;

}

function moveTime() {
  var elem = document.getElementById("timer");
  elem.style.border = "none";
  //var field = document.getElementById("textField");

  //var width = document.getElementsByClassName("main").style.width;
  //console.log(width);
  var pos = 0;
  var size = 12;
  var id = setInterval(frame, 5);

  function frame() {
    if (elem.style.left == "40%") {
      clearInterval(id);
    } else {
      pos += .25;
      size += .5;
      //field.style.top = pos + '%';
      elem.style.top = (pos*12) + '%';
      elem.style.left = pos + '%';
      elem.style.fontSize = size + 'pt';
    }
  }
}

function flashRED() {
  document.getElementById("timer").style.color = "red";
  //button.style.backgroundColor = "red";
  //console.log(button);

}

function changeBack() {
  document.getElementById("timer").style.color = "black";
  //button.style.backgroundColor = "blue";

}

//startTimer rus a timer in the background, that is displayed in the div named "timer"
function startTimer() {
  var minutesLabel = document.getElementById("minutes");
  var secondsLabel = document.getElementById("seconds");
  timeID = setInterval(setTime, 1000);

  function setTime() {
    //totalSeconds will return the total # of seconds every second
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  }
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function submitNameTime() {
  document.getElementById("textField").style.display = "none";
  namePlayer = returnName();
  updateRecord();
}

function getRank() {
  let comparison = 4;
  console.log(leaderBoard[comparison].time);
  if (totalSeconds >= leaderBoard[4].time) {
    console.log("Your time doesn't qualify");
    return 5;
  } else {
    while (comparison >= 0 && leaderBoard[comparison].time > totalSeconds) {
      comparison--;
    }
    comparison += 1;
    console.log("Final spot is: " + comparison);
    return comparison;
  }
}

function returnName() {
  let inputName = document.getElementById('input1').value;
  return inputName;
}

function updateRecord() {
  //based on the number, should determine which ones have to go and which ones can stay
  let newEntry = {
    name: namePlayer,
    time: totalSeconds
  };
  console.log(newEntry);
  //if rank is 3, then [4]=3; [3]=2, [2]=newEntry
  //if ran is 1, then [4]=3, 3=2, 2=1,1=0, then 0=newEntry;
  let pointer = 4;
  while (pointer != arraySpot) {
    leaderBoard[pointer] = leaderBoard[pointer - 1];
    pointer--;
  }
  leaderBoard[arraySpot] = newEntry;
  console.log(leaderBoard[0].time);
  console.log(leaderBoard[1].time);
  console.log(leaderBoard[2].time);
  console.log(leaderBoard[3].time);
  console.log(leaderBoard[4].time);
  updateTableView();

}

function updateTableView() {
  let x = document.getElementById('board').rows;
  let counter = 0;
  while (counter < 5) {
    let currentCellTime = leaderBoard[counter].time;
    let stringSecs = pad(currentCellTime % 60);
    let stringMins = pad(parseInt(currentCellTime / 60));
    let stringTime = stringMins + ":" + stringSecs;

    let y = x[counter + 1].cells;
    y[1].innerHTML = leaderBoard[counter].name;
    y[2].innerHTML = stringTime;
    counter++;
  }
}

function endGame() {
  console.log("trying to end");
  document.getElementById("options").style.visibility = "hidden";
  //document.getElementById("textField").style.display = "block";
  clearInterval(timeID);
  moveTime();
  document.getElementById("endGame").style.display = "block";
  document.getElementById("counter").style.visibility = "hidden";
  document.getElementById("question").style.visibility = "hidden";
  document.getElementById("userMessage").style.visibility = "hidden";
  document.getElementById("penalty").style.visibility = "hidden";
  document.getElementById("finalResult").style.display = 'block';
  document.getElementById("again").addEventListener("click", playAgain);

  arraySpot = getRank();

  if (arraySpot == 5) {
    document.getElementById("finalResult").innerHTML = "Good work, but unfortuantely your time did not qualify. Try Again!!";
  } else if (arraySpot < 5) {
    document.getElementById("finalResult").innerHTML = "Awesome work. Please enter your name above to join the leaderboard!";
    document.getElementById("textField").style.display = "block";
  } else {
    console.console.log("Something is wrong because the arraySpot is: " + arraySpot);
  }

  //Once they click submit on the field, submitNameTime will be called

  //finalTime = totalSeconds + penalty;
  //document.getElementById("userMessage").innerHTML = "You have successfully answered 10 questions! Your overall time was: " + finalTime;
}

function playAgain() {
  location.reload();
}

function start() {
  tenQs = generateQs();

  showQuestion();
  startTimer();
  updateTableView();
}

//window.onload makes sure the html loads before the JS references the html

window.onload = function runJS() {

  start();

}
