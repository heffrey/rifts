// Copyright 2019 Jeff Whiteside

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

$(function () {
  $('[data-toggle="popover"]').popover()
});

$(function () {
  $('[data-toggle="collapse"').collapse()  
});

$(function () {
  $.get("classes.json", function(data){
    $("#character-class").typeahead({ source:data });
  },'json');
});

var characters = new Object();

$(function () {
  $("#character-form").submit(function (a) {
    a.preventDefault();
    var character = $("#character-form").serializeObject();
    characters[character.name] = character;
    localStorage.setItem("characters",JSON.stringify(characters));
  })
});


$(function () {
  $("#dice-button").click(function () {$(`#dice-frame`).fadeToggle()})
});

$(function () {
  $(".badge").click(function (a) {a.preventDefault()});
  $(".badge").css('cursor', 'help');
});

$(function () {
  $("a").click(function (a) { setView_clicked (a) })
});

function setView_main ()
{
  var div = document.createElement("div");
  div.className = "jumbotron bg-white";
  div.style = "margin-top: .5rem;";

  $(div).append(`<h1 class="display-4">Introduction</h1>
  <p class="lead"><img src="./rifts.jpg" class="rounded float-right p-3 w-auto" alt="">
  <strong>RIFTS&reg Campaign Manager</strong> is a light-weight web application that uses your browser's localStorage (similar to cookies), to ensure your campaign can continue right where you left off. Initially developed for fun and to learn more about the Megaverse&reg, this project is open source under the MIT License with no intention to ever make a profit. Please support Palladium Books&reg by purchasing source materials on the <a href="https://palladium-store.com">official website</a>, a licensed PDF resaler such as <a href="https://www.drivethrurpg.com/#">DriveThruRPG</a>, or your local hobby shop.</p>
  `);
  $("#main-container").html(div);
}

function get_characters()
{
  characters = JSON.parse(localStorage.getItem("characters"));
}

function deleteCharacter(a)
{
  var name = characters[a].name;
  delete characters[a];
  localStorage.setItem("characters",JSON.stringify(characters));
  $("#top-container").prepend(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>` + name + `</strong> Has been deleted.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  </div>`);
}

function character_card (b)
{
  return (`<div class="col"><div class="card m-3" style="width: 275px;">` +
// b.name
    `<div class="card-header"><h4>` + b.name + `</h4>` +

// b.level 
    `<h5>Level: 1</h5>` +

    `<h6>` + b.occrcc + `</h6></div>` +
    
    
    `<div class="card-body">`
      + `<img src="head.png" style="position: relative; float: left; margin-right: .85rem;">
    <img src="sword.png" class="cardicon m-1"><img src="armor.png" class="cardicon m-1"><img src="tire.png" class="cardicon m-1"><img src="pouch.png" class="cardicon m-1"><img src="magic.png" class="cardicon m-1"><img src="psi.png" class="cardicon m-1">` +
      `</div>` +
      
// b.exp
     `<div class="m-1">0 / 2500 xp</div>` +
     
// b.sdc/mdc
      `<div class="progress m-1" style="height: 24px;"><div class="progress-bar bg-success" role="progressbar" style="width: 90%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">SDC`
      + `</div></div>`

// b.hp
     + `<div class="progress m-1" style="height: 24px;">` +
      `<div class="progress-bar bg-danger" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">HP`
      + `</div></div>` + 
      
// b.ppe      
     `<div class="progress m-1" style="height: 24px;">` +
      `<div class="progress-bar" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">PPE`
    + `</div></div>` + 
      
// b.ISP
      `<div class="progress m-1" style="height: 24px;">` +
      `<div class="progress-bar bg-warning" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">ISP`
      + `</div></div>` + 
      
      
      `<div class="btn-group">` +
      `<button type="button" class="btn btn-info btn-sm m-1">Edit</button>` +
      `<button type="button" class="btn btn-danger btn-sm m-1" data-toggle="confirmation" data-confirmation-event="deleteCharacter(` + b.name + `)">Delete</button>` +
      `</div>` +
      
     `</div></div>`);

}

function setView_char ()
{
  var div = document.createElement("div");
  div.className = "jumbotron h-100 bg-white";
  div.style = "margin-top: .5rem;";

  $(div).html(`<h1 class="display-4">Characters</h1>`);

  get_characters();	
 
  var div2 = document.createElement("div");
  div2.className = "row";
  $(div).append(div2);

  var count = 0;
  $.each(characters, function(a,b) {
    count++;
    $(div2).append(character_card(b));
  });
  
  $("#main-container").html(div);
  $('[data-toggle=confirmation]').confirmation({
  rootSelector: '[data-toggle=confirmation]', // other options
  });
  $("img.cardicon").css("cursor", "pointer");
}

$(function () {
  var urlAnchor = document.URL.split("#")[1];
  if (urlAnchor)
  {
    setView("#" + urlAnchor);
  } else
  setView_main();
});

function setView(clicked)
{ 
  switch (clicked)
  {
    case "#main":
    setView_main();
    break;
    
    case "#characters":
    setView_char();
    break;
  }
}

function setView_clicked (a)
{
  var clicked = a.currentTarget.hash;
  setView(clicked);
}