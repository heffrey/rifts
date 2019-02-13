// Copyright 2019 Jeff Whiteside

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const d10tenfaces = ["fa", "fat", "fab"];
const d10ten = [
  {"fa": "00", "fat": 80, "fab": 40},
  {"fa": 10, "fat": 90, "fab": 70},
  {"fa": 20, "fat": 60, "fab": 80},
  {"fa": 30, "fat": 70, "fab": 50},
  {"fa": 40, "fat": "00", "fab": 60},
  {"fa": 50, "fat": 30, "fab": 90},
  {"fa": 60, "fat": 40, "fab": 20},
  {"fa": 70, "fat": 10, "fab": 30},
  {"fa": 80, "fat": 20, "fab": "00"},
  {"fa": 90, "fat": 50, "fab": 10}
  ];
  
const d10onefaces = ["fb", "fbl", "fbr"];
const d10one = [
  {"fb": 0, "fbl": 8, "fbr": 4},
  {"fb": 1, "fbl": 9, "fbr": 7}, 
  {"fb": 2, "fbl": 6, "fbr": 8},    
  {"fb": 3, "fbl": 7, "fbr": 5},
  {"fb": 4, "fbl": 0, "fbr": 6},  
  {"fb": 5, "fbl": 3, "fbr": 9},
  {"fb": 6, "fbl": 4, "fbr": 2},
  {"fb": 7, "fbl": 1, "fbr": 3},
  {"fb": 8, "fbl": 2, "fbr": 0},
  {"fb": 9, "fbl": 5, "fbr": 1}
];

const d20faces = ["d20f0","d20f1", "d20f4", "d20f7", "d20f9", "d20f5", "d20f8", "d20f6", "d20f2", "d20f3"];
const d20 = [
  {"d20f0": 1, "d20f1":7, "d20f4":19, "d20f7":13, "d20f9":15, "d20f5":9, "d20f8":5, "d20f6":11, "d20f2":17, "d20f3":3},
  {"d20f0": 2, "d20f1":12, "d20f4":18, "d20f7":20, "d20f9":10, "d20f5":4, "d20f8":8, "d20f6":14, "d20f2":15, "d20f3":5},
  {"d20f0": 3, "d20f1":17, "d20f4":16, "d20f7":19, "d20f9":7, "d20f5":6, "d20f8":1, "d20f6":9, "d20f2":10, "d20f3":8},
  {"d20f0": 4, "d20f1":18, "d20f4":11, "d20f7":14, "d20f9":2, "d20f5":9, "d20f8":20, "d20f6":6, "d20f2":5, "d20f3":13},
  {"d20f0": 5, "d20f1":18, "d20f4":15, "d20f7":13, "d20f9":4, "d20f5":7, "d20f8":11, "d20f6":1, "d20f2":2, "d20f3":12},
  {"d20f0": 6, "d20f1":9, "d20f4":16, "d20f7":14, "d20f9":11, "d20f5":8, "d20f8":4, "d20f6":20, "d20f2":19, "d20f3":3},
  {"d20f0": 7, "d20f1":15, "d20f4":17, "d20f7":1, "d20f9":5, "d20f5":3, "d20f8":13, "d20f6":19, "d20f2":12, "d20f3":10},
  {"d20f0": 8, "d20f1":16, "d20f4":10, "d20f7":20, "d20f9":6, "d20f5":12, "d20f8":14, "d20f6":2, "d20f2":3, "d20f3":17},
  {"d20f0": 9, "d20f1":6, "d20f4":11, "d20f7":19, "d20f9":16, "d20f5":13, "d20f8":3, "d20f6":1, "d20f2":14, "d20f3":4},
  {"d20f0": 10, "d20f1":17, "d20f4":12, "d20f7":8, "d20f9":3, "d20f5":2, "d20f8":16, "d20f6":20, "d20f2":7, "d20f3":15},
  {"d20f0": 11, "d20f1":9, "d20f4":4, "d20f7":13, "d20f9":19, "d20f5":18, "d20f8":1, "d20f6":5, "d20f2":6, "d20f3":14},
  {"d20f0": 12, "d20f1":10, "d20f4":15, "d20f7":2, "d20f9":8, "d20f5":5, "d20f8":20, "d20f6":18, "d20f2":17, "d20f3":7},
  {"d20f0": 13, "d20f1":11, "d20f4":5, "d20f7":1, "d20f9":9, "d20f5":15, "d20f8":19, "d20f6":7, "d20f2":4, "d20f3":18},
  {"d20f0": 14, "d20f1":4, "d20f4":6, "d20f7":20, "d20f9":18, "d20f5":16, "d20f8":2, "d20f6":8, "d20f2":11, "d20f3":9},
  {"d20f0": 15, "d20f1":5, "d20f4":12, "d20f7":7, "d20f9":13, "d20f5":10, "d20f8":1, "d20f6":17, "d20f2":18, "d20f3":2},
  {"d20f0": 16, "d20f1":6, "d20f4":3, "d20f7":8, "d20f9":14, "d20f5":17, "d20f8":20, "d20f6":10, "d20f2":9, "d20f3":19},
  {"d20f0": 17, "d20f1":10, "d20f4":3, "d20f7":7, "d20f9":12, "d20f5":19, "d20f8":15, "d20f6":1, "d20f2":8, "d20f3":16},
  {"d20f0": 18, "d20f1":5, "d20f4":4, "d20f7":2, "d20f9":15, "d20f5":14, "d20f8":12, "d20f6":20, "d20f2":13, "d20f3":11},
  {"d20f0": 19, "d20f1":3, "d20f4":9, "d20f7":1, "d20f9":17, "d20f5":11, "d20f8":7, "d20f6":13, "d20f2":16, "d20f3":6},
  {"d20f0": 20, "d20f1":2, "d20f4":14, "d20f7":8, "d20f9":12, "d20f5":6, "d20f8":10, "d20f6":16, "d20f2":18, "d20f3":4}
];  

const d12faces = ["d12f0", "d12f1", "d12f2", "d12f3", "d12f4", "d12f5"];
const d12 = [
  {"d12f0": 1, "d12f1": 5, "d12f2": 10, "d12f3": 2, "d12f4": 4, "d12f5": 6},
  {"d12f0": 2, "d12f1": 7, "d12f2": 8, "d12f3": 4, "d12f4": 1, "d12f5": 10},
  {"d12f0": 3, "d12f1": 6, "d12f2": 4, "d12f3": 8, "d12f4": 12, "d12f5": 11},
  {"d12f0": 4, "d12f1": 8, "d12f2": 3, "d12f3": 6, "d12f4": 1, "d12f5": 2},
  {"d12f0": 5, "d12f1": 11, "d12f2": 9, "d12f3": 10, "d12f4": 1, "d12f5": 6},
  {"d12f0": 6, "d12f1": 3, "d12f2": 11, "d12f3": 5, "d12f4": 1, "d12f5": 4},
  {"d12f0": 7, "d12f1": 2, "d12f2": 10, "d12f3": 9, "d12f4": 12, "d12f5": 8},
  {"d12f0": 8, "d12f1": 4, "d12f2": 2, "d12f3": 7, "d12f4": 12, "d12f5": 3},
  {"d12f0": 9, "d12f1": 10, "d12f2": 5, "d12f3": 11, "d12f4": 12, "d12f5": 7},
  {"d12f0": 10, "d12f1": 9, "d12f2": 7, "d12f3": 2, "d12f4": 1, "d12f5": 5},
  {"d12f0": 11, "d12f1": 5, "d12f2": 6, "d12f3": 3, "d12f4": 12, "d12f5": 9},
  {"d12f0": 12, "d12f1": 11, "d12f2": 3, "d12f3": 8, "d12f4": 7, "d12f5": 9}
];

const d8faces = ["d8f0", "d8f1", "d8f2", "d8f3"];
const d8 = [
  {"d8f0": 1, "d8f1": 3, "d8f2": 7, "d8f3": 4},
  {"d8f0": 2, "d8f1": 4, "d8f2": 8, "d8f3": 3},
  {"d8f0": 3, "d8f1": 5, "d8f2": 1, "d8f3": 2},
  {"d8f0": 4, "d8f1": 6, "d8f2": 2, "d8f3": 1},
  {"d8f0": 5, "d8f1": 7, "d8f2": 3, "d8f3": 8},
  {"d8f0": 6, "d8f1": 8, "d8f2": 4, "d8f3": 7},
  {"d8f0": 7, "d8f1": 1, "d8f2": 5, "d8f3": 6},
  {"d8f0": 8, "d8f1": 2, "d8f2": 6, "d8f3": 5}
];

const d4faces = ["d4f0", "d4f1", "d4f2"];
const d4 = [
  {"d4f0": 1, "d4f1": 2, "d4f2": 3},
  {"d4f0": 2, "d4f1": 1, "d4f2": 3},
  {"d4f0": 3, "d4f1": 4, "d4f2": 2},
  {"d4f0": 4, "d4f1": 3, "d4f2": 1}
];

var logLine = 0;

function logRoll(a)
{
  var log = document.getElementById("dice-log");
  logLine++;
  if (logLine < 10) logLine =  "  " + logLine;
  else if (logLine < 100) logLine = " " + logLine;
  log.value = log.value + logLine + ". " +  a + "\n";
  log.setSelectionRange(log.value.length,log.value.length);
}

function logClear(){
  var log = document.getElementById("dice-log");
  log.value = "";
  logLine = 0;
}

function randBetween(min,max)
{
  var c = Math.floor(Math.random()*(max-min+1)) + min;
  return c;
}

function renderD20_faces(die, value)
{
   var die_face = d20[value-1];
   d20faces.forEach(function(a){die.getElementsByClassName(a)[0].innerText = die_face[a]; } );
}

function renderD12_faces(die, value)
{
   var die_face = d12[value-1];
   d12faces.forEach(function(a){die.getElementsByClassName(a)[0].innerText = die_face[a]; } );
}

function renderD4_face(die, value)
{
   var die_face = d4[value-1];
   d4faces.forEach(function(a){die.getElementsByClassName(a)[0].innerText = die_face[a]; } );
}

function animate(die, animation_callback)
{
  var id = setInterval(frame, 5);
  var c = 0;
  function frame (){
    if (c>50) {
      clearInterval(id);
      logRoll(die.type + " rolls " + die.value);
    } else
    {
      c++;
      animation_callback();
    }
  } 
}

function renderPct_faces (dice, roll)
{
  var roll_ten = Math.floor(roll/10)*10;
  var roll_one = roll - roll_ten;
  var one_face = d10one[roll_one];
  var ten_face = d10ten[roll_ten/10];  
  d10onefaces.forEach(function(a){dice.getElementsByClassName(a)[0].innerText = one_face[a]; });
  d10tenfaces.forEach(function(a){dice.getElementsByClassName(a)[0].innerText = ten_face[a]; });
}

function rollPct(dice, mode) 
{
  switch (mode) 
  {
    case "animated":
      animate(dice, function(){    
        var roll = randBetween(0,99);
        renderPct_faces(dice, roll);
        dice.value = roll;});
      break;
    case "static":
      var roll = randBetween(0,99);
      renderPct_faces(dice, roll);
      dice.value = roll;
      break;
  }
}

function rollD20(die, mode) 
{  
  switch (mode) 
  {
    case "animated":
      animate(die, function(){    
        var roll = randBetween(1,20);
        renderD20_faces(die, roll);
        die.value = roll;});
      break;
    case "static":
      var roll = randBetween(1,20);
      renderD20_faces(die, roll);
      die.value = roll;
      break;
  }
}

function renderD8_faces(die, value)
{
   var die_face = d8[value-1];
   d8faces.forEach(function(a){die.getElementsByClassName(a)[0].innerText = die_face[a]; } );
}


function renderD6_face(die, value)
{
  die.getElementsByClassName("d6f0")[0].innerText = value;
}

function rollD12(die, mode) 
{
  switch (mode) 
  {
    case "animated":
      animate(die, function(){    
        var roll = randBetween(1,12);
        renderD12_faces(die, roll);
        die.value = roll;});
      break;
    case "static":
      var roll = randBetween(1,12);
      renderD12_faces(die, roll);
      die.value = roll;
      break;
  }
}


function rollD8(die, mode) 
{
  switch (mode) 
  {
    case "animated":
      animate(die, function(){    
        var roll = randBetween(1,8);
        renderD8_faces(die, roll);
        die.value = roll;});
      break;
    case "static":
      var roll = randBetween(1,8);
      renderD8_faces(die, roll);
      die.value = roll;
      break;
  }
}

function rollD6(die, mode) 
{
  switch (mode) 
  {
    case "animated":
      animate(die, function(){    
        var roll = randBetween(1,6);
        renderD6_face(die, roll);
        die.value = roll;});
      break;
    case "static":
      var roll = randBetween(1,6);
      renderD6_face(die, roll);
      die.value = roll;
      break;
  }
}

function rollD4(die, mode) 
{
  switch (mode) 
  {
    case "animated":
      animate(die, function(){    
        var roll = randBetween(1,4);
        renderD4_face(die, roll);
        die.value = roll;});
      break;
    case "static":
      var roll = randBetween(1,4);
      renderD4_face(die, roll);
      die.value = roll;
      break;
  }
}

function addFace (a, b) 
{
  var div = document.createElement("div");
  div.className = b;
  a.appendChild(div);
}

function appendImg (a, b) 
{
  var img = document.createElement("img");
  img.src = b;
  img.draggable = false;
  a.appendChild(img);
  
}

function renderPct(die)
{
  die.width = 128;
  die.height = 64;
  die.onclick = function() { rollPct(die, "animated"); };
  
  appendImg(die, "./pcta.png");
  appendImg(die, "./pctb.png");
  
  d10tenfaces.forEach(function(face){addFace(die,face);});
  
  d10onefaces.forEach(function(face){addFace(die,face);});
  
  rollPct(die, "static");
}

function renderD20(die)
{
  die.width = 64;
  die.height = 64;
  die.onclick = function() { rollD20(die, "animated"); };
  
  appendImg(die, "./d20.png");
  d20faces.forEach(function(face){addFace(die, face);}); 
  
  rollD20(die, "static");
}

function renderD12(die)
{
  die.width = 64;
  die.height = 64;
  die.onclick = function() { rollD12(die, "animated"); };
  
  appendImg(die, "./d12.png");
  d12faces.forEach(function(face){addFace(die, face);}); 

  rollD12(die, "static");
}

function renderD8(die)
{
  die.width = 64;
  die.height = 64;
  die.onclick = function() { rollD8(die, "animated"); };


  appendImg(die, "./d8.png");
  d8faces.forEach(function(face){addFace(die, face);}); 

  rollD8(die, "static");
}

function renderD4(die)
{
  die.width = 64;
  die.height = 64;
  
  die.onclick = function() { rollD4(die, "animated"); };

  appendImg(die, "./d4.png");

  d4faces.forEach(function(face){addFace(die, face);}); 
  
  rollD4(die, "static");
}

function renderD6(die)
{
  die.width = 64;
  die.height = 64;
  die.onclick = function() { rollD6(die, "animated"); };
  
  appendImg(die, "./d6.png");

  addFace(die, "d6f0");
  
  rollD6(die, "static");
}

function renderDice() 
{
  var pct = document.getElementsByClassName("pct");
  for (let die of pct) 
  {
    die.type = "pct";
    renderPct(die);
  }
  
  var d20 = document.getElementsByClassName("d20");
  for (let die of d20) 
  {
    die.type = "d20";
    renderD20(die);
  }
  
  var d12 = document.getElementsByClassName("d12");
  for (let die of d12) 
  {
    die.type = "d12";
    renderD12(die);
  }
 
  var d8 = document.getElementsByClassName("d8");
  for (let die of d8) 
  {
    die.type = "d8";
    renderD8(die);
  }
 
  var d6 = document.getElementsByClassName("d6");
  for (let die of d6) 
  {
    die.type = "d6"
    renderD6(die);
  }
  
  var d4 = document.getElementsByClassName("d4");
  for (let die of d4) 
  {
    die.type = "d4";
    renderD4(die);
  }
  
  logClear();
}
