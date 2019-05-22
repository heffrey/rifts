// Copyright 2019 Jeff Whiteside

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var gmLog = [];

function loadClasses () {
  $.get("classes.json", function(data){
    $("#character-class").typeahead({ source:data });
  },'json');
}

function loadWeapons () {
  $.get("weapons.json", function(data){
    $("#character-class").typeahead({ source:data });
  },'json');
}

$(function () {
  $("#dice-button").click(function () {$(`#dice-frame`).fadeToggle()})
});


$(function () {
  $("a").click(function (a) { 
    setView_clicked (a); 
  })
});

function setView_main (callback)
{
  var jumbotron = document.createElement("div");
  jumbotron.className = "jumbotron bg-white";
  jumbotron.style = "margin-top: .5rem;";
  
  $(jumbotron).append(mainView);
  $("#main-container").html(jumbotron);
  callback();
}

function getCharacters()
{
  characters = JSON.parse(localStorage.getItem("characters"));
}

function deleteCharacter(character)
{
  const characterDetails = new Character(character, characters[character]);
  var widget = new Widget();
  
  $("#top-container").prepend(
  widget.html(
  deleteAlert,
  characterDetails,
  "character",
  function() { 
    delete characters[Number(character)];
    localStorage.setItem("characters",JSON.stringify(characters));
  $(`[data-character-card="${characterDetails.id}"]`).fadeOut();}
  ));
  
}

function common_writeChar()
{
  
  var character = $("#character-form").serializeObject();
  characters = characters || [];
  
  while (characters[characterAutoIncrement])
  {
    characterAutoIncrement += 1;
  }
 
  character.id = character.id || characterAutoIncrement;
  character = new Character(character.id,character);
  
  if (characters)
  { 
    character.objectAttributes().forEach( (attribute) =>
    { 
      character[attribute] = character[attribute] || [];
      if (character[attribute] != []) 
        character[attribute] = typeof character[attribute] == "string" ? JSON.parse(character[attribute]) : character[attribute];
    });
    characters[character.id] = character;
    localStorage.setItem("characters", JSON.stringify(characters));
  }
  else if (character.id != 0)
  {
    throw "Attempted to write a null Character object.";
  }
}

function character_card (characterObject)
{
  try {
    var w = new Widget();
    c = new Character(characterObject.id, characterObject)
    return (w.html(characterCard,c ,"character"));
  }
    catch (e)
    { console.error ("Error in character_card"); }
}

function setView_char (callback)
{
  var jumbotron = document.createElement("div");
  jumbotron.className = "jumbotron h-90 bg-white";
  jumbotron.style = "margin-top: .5rem;";
  
  $(jumbotron).html(`<h1 class="display-4">Characters</h1>`);
  
  getCharacters();	
  
  var characterLineup = document.createElement("div");
  characterLineup.className = "row";
  $(jumbotron).append(characterLineup);
  
  $.each(characters, function(a,character) {
    if (character)
    $(characterLineup).append(character_card(character));
  });
  
  $(jumbotron).append( `<a href="#addchar" class="btn btn-primary btn-lg m-1 addchr">Add</button>`);
  
  $("#main-container").html(jumbotron);
  $("img.cardicon").css("cursor", "pointer");
  if (callback)
    callback();
}

$(function () {
  var urlAnchor = document.URL.split("#")[1];
  if (urlAnchor)
  {
    setView("#" + urlAnchor);
  } else
  setView_main(function(){});
});

function setView_addChar(callback)
{
  var jumbotron = document.createElement("div");
  jumbotron.className = "row";
  jumbotron.className = "jumbotron h-90 bg-white";
  jumbotron.style = "margin-top: .5rem;";
  
  $(jumbotron).html(`<h1 class="display-4">Character Sheet</h1>`);
  
  $(jumbotron).append(characterForm);
  $("#main-container").html(jumbotron);  
  callback();
}



function common_charView()
{
  $("a.addchr").click(function (a) { setView_clicked (a) });
  
  $('[data-toggle="edit"]').click(function (a)
  {
    setView_editChar($(this));
  });
  
  const optionCategories = {
    "exp": "Experience", 
    "credits": "Credits", 
    "weapon": "Weapons", 
    "magic": "Magic", 
    "loot": "Loot", 
    "vehicle": "Vehicles", 
    "psi": "Psionics",
    "armor": "Armor",
    "character": "Character"
  };
  
  document.badgeWidgets = new Widget({
    selectClass: "character-command",
    relyOn: "character",
    fromList: characters,
    structuredAs: function(a, b){ return new Character (a,b)},
    widget: function (callingWidget, object, optionSelected) { 
      let head = `<h5>${optionCategories[optionSelected]}</h5>`;
      let c = new Character(object.id, object);
      let body = ``;
      switch (optionSelected)
      {
        // data here is static. Not recommended to add dynamic data here.
        // such as attributes that are frequently updated.
        case "credits":
        body = `Spend or gain credits`;
        break;
        
        case "exp":
        body = `Gain experience`;
        break;
        
        case "weapon":
        body = `View or edit player weaponry`;
        break;
        
        case "armor":
        body = `View or edit player armory`;
        break;
        
        case "vehicle":
        body = `Enter or exit existing vehicle`;
        break;
        
        case "character":
        body = `Skills and standings`;
        break;
        
        case "loot":
        body = `Gain, buy or sell loot`;
        break;
      }
      return `<div class="alert alert-info"><button class="close">x</button>${head}${body}</div>`
    },
    postWidget: function(a) { 
      $(".close").click(
      function(a){
        a.target.parentNode.parentNode.innerHTML="";
      });
      
      
      $(".widget-option").click(function () {
        let character = new Character($(this).attr('data-character'), characters[$(this).attr('data-character')]);
        character.doAction($(this).attr('data-action'),character, this, setView_char);
      });      
    }
  });
  
  $('[data-toggle="confirmation"]').confirmation(
  {
    onConfirm: function(a) { 
      deleteCharacter($(this).attr('data-character'));
    }
  });
}

function common_updateChar(c, callback)
{
  
  var character = new Character(c.id,c);
  if (character.id != 0 && characters )
  {
    characters[Number(character.id)] = character;
    localStorage.setItem("characters",JSON.stringify(characters));
  }
  else if (character.id != 0)
  {
    characters = new Object();
    characters[Number(character.id)] = character;
    localStorage.setItem("characters",JSON.stringify(characters));
  }
  callback();
}



function refresh_char(a)
{
  a.preventDefault();
  common_writeChar()  
}

function common_charFunc(clicked)
{
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="collapse"]').collapse();
  
  $("#character-form").submit(function (a) {
    if (clicked != "#addchar")
      refresh_char(a);
    // setView("#characters");
  });    
  $("#player-create").click(function (a){
    refresh_char(a);
    setView("#characters");
  });
  loadClasses();
}

function setView_combat(callback)
{
  var jumbotron = document.createElement("div");
  jumbotron.className = "jumbotron h-90 bg-white";
  jumbotron.style = "margin-top: .5rem;";
  
  $(jumbotron).html(`<h1 class="display-4">Combat</h1>`);
  
  var combatBox = document.createElement("div");
  combatBox.className = "row";
  combatBox.id = "combat-box";
  $(jumbotron).append(combatBox);

  const combat = new Combat("root");
  combat.begin(combatBox);

  $("#main-container").html(jumbotron);
  $("img.cardicon").css("cursor", "pointer");
  callback();
}

function setView_editChar(clicked)
{
  var character = characters[clicked.attr("data-character")];
  setView_addChar(function() {
    
    common_charFunc(clicked);
    $("h1").html(character.name);
    $("#player-create").html("Update");
    
    $.each(character, function(key,value){
      console.info(`${key} ${value} ${typeof value}`)
     //if (true)
      //$(`[name=${key}]`).val(value);
     //else
      typeof value == "object" ? $(`[name=${key}]`).val(JSON.stringify(value)) : $(`[name=${key}]`).val(value);
    });
    
  });
}	


function setView(clicked)
{ 
  // $("#main-container").hide();
  //$('.popover').fadeOut().remove();
  
  switch (clicked)
  {
    
    case "#main":
    setView_main(function (){
    });
    break;
    
    case "#characters":
    setView_char(function() {
      common_charView();
      common_charFunc(clicked);
    });
    break;
    
    case "#addchar":
    setView_addChar(function() { 
      common_charFunc(clicked);
    });
    break;
    
    case "#editchar":
    setView_editChar(clicked);
    break;
    
    case "#delchar":
    setView_addChar();
    break;
    
    case "#combat":
    setView_combat(function() { 
    });
    break;
    
    case "vehicles":
    break;
  }
}

function setView_clicked (a)
{
  //a.preventDefault();
  var clicked = a.currentTarget.hash;
  setView(clicked);
}  