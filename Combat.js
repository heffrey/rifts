"use strict";

var combatHistory = [];


function countToWord(number)
{
   const map = [
   "Null",
   "First",
   "Second",
   "Third",
   "Fourth",
   "Fifth",
   "Sixth",
   "Seventh",
   "Eightth",
   "Ninth",
   "Tenth",
   "Eleventh",
   "Twelfth",
   "Thirteenth",
   "Fourteenth",
   "Fifteenth"];
   return map[number];
}

// Get characters (who will fight)
// Get initiatives
// Apply bonuses to initiatives
// Order characters
// Start melee
// Start attack
// Each player gets a turn according to initiatives

// Turn: Move, Prep spell, Attack, Move+Attack
// 

class Combat extends WidgetObject
{
  // calculated values
  calculate()
  {
    console.info("Calculating combat object values...");
    
    
  }
  
  
  // populated values
  populate()
  {
    console.info("Populating combat object values...");
    
    this.turn = this.turn || "START";
    this.meleeround = this.meleeround || 0;
    this.attackround = this.attackround || 0;
    this.characters = this.characters || [];
    combatHistory = combatHistory || [];
    
  }
  
  begin(target)
  {
    
    this.target = target;
    
    if (this.id == "root" && combatHistory.length > 0)
    {
      this.id = this.turn;
      this.turn = combatHistory[combatHistory.length - 1]["turn"];
    }   
    
    let html = `<div class="col">`;
    
    console.log(this.turn);
    
    switch (this.turn)
    {
      case "START":
      html += this.getCharacters();
      break;
      
      case "INIT":
      html += this.getInitiatives();
      break;
      
      case "FIGHT":
      html += this.FIGHT();
      break;
      
      case "ACTION":
      
      break;
    }
    html += `</div>`;
    if ($(target).html(`${html}`) && this.next)
    this.next();
    
    
  }
  
  endTurn ()
  {
    const last = new Combat(combatHistory.length, this);
    combatHistory[combatHistory.length] = last;
    this.begin(this.target);
  }
  
  
  getCharacters()
  {
    const f = new Form();
    let html = `<h3>Selection</h3>`;
    html += f.quickForm("select-characters",
    [
      {size: "sm"},
      {select: "Characters", prompt: "Fighting?", list:characters, index: "name", id: "id", widget: ["character","<small>Atk/melee: {character.atk} <br \>Init bonus: +{character.init} <br \>Strike: +{character.strike} <hr \></small>"]
      },
      {btn: "Fight!"}
    ]);
    
    this.next = () =>
    {
      $("input").click( (a) =>
      { 
        if (a.currentTarget.checked == false)
        $(a.currentTarget.parentElement.parentElement.parentElement).addClass("text-muted");
        else
        $(a.currentTarget.parentElement.parentElement.parentElement).removeClass("text-muted");
        
      })
      
      $("form#select-characters").submit( (a) => 
      {
        a.preventDefault();
        let inputs = $('input');
        for (let i=0; i<inputs.length;i++) 
        { 
          if (inputs[i].checked == true) 
          this.characters[this.characters.length] = characters[inputs[i].id];
        };
        this.turn = "INIT";
        this.endTurn();
      });
    }
    return html;
  }
  
  getInitiatives()
  {
    var params = [];      
    for (var i = 0; i < this.characters.length; i++)
    {
      let id = this.characters[i].id;      
      let name = characters[id].name;
      let initBonus = characters[id].init;
      
      params[params.length] = {number: name, index: String(i), holder: "D20", min:1, max: 20};
    }
    
    const f = new Form();
    let html = `<h3>Roll Initiative</h3>`;

    
    html += f.quickForm("roll-init",
    [{size: "lg"}].concat(params)
    );
    
    this.next = () =>
    {
      $("form#roll-init").submit( (a) => 
      {
        a.preventDefault();
        let inputs = $('input');
        for (let i=0; i<inputs.length;i++) 
        { 
          let index = inputs[i].name;
          console.log(this.characters[index].name);
          this.characters[index].initiative = Number(this.characters[index].init) + 
          Number(inputs[i].value);
          this.characters[index]["fighting"] = true;
          console.log(inputs[i].value + "+=" + this.characters[inputs[i].name].initiative);
        };
        this.characters.sort((a, b) => a.initiative < b.initiative);
        
        //  this.characters.forEach((a) => window.alert(a.atk));
        console.log(this.characters);
        this.turn = "FIGHT";
        
        this.meleeround += 1;
        this.attackround += 1;
        
        this.maxAtk = 2;

        if (this.attackround == 1) //Set atkRem - i.e. Attacks remaining 
          this.characters.forEach((a) =>  
            {
              this.maxAtk = a.atk > this.maxAtk ? a.atk : this.maxAtk;
              a.atkRem = Number(a.atk)
            });
        else
          this.characters.forEach((a) =>  a.atkRem -= 1);

        this.endTurn();
      });
    }
    
    return html;
  }
  
  combatCard(characterObject)
  {
    const combatObject = {round: this.attackround, melee: this.meleeround};
    const w = new Widget();
    let html = w.html(combatCard, characterObject, "character");
    html = w.html(html, combatObject, "combat");
    return html;
  }
  
  FIGHT()
  {
    let html = `<h4 class="ml-0">Melee Round ${this.meleeround}</h4><h5 class="ml-0">${countToWord(this.attackround)}  Attack Round</h5><div class="row">`;
    
    for (let i = 0; i<this.characters.length; i ++)
    {
      
      html += this.combatCard(this.characters[i]);
      
    }

    this.next = () =>
    {
      document.combatWidgets = new Widget({
      selectClass: "combat-command",
      relyOn: "character",
      fromList: characters,
      structuredAs: function(a, b){ return new Character (a,b)},
      widget: function (callingWidget, object, optionSelected) { 
        let head = `<h5>${console.log(optionSelected)}</h5>`;
        let c = new Character(object.id, object);
        let body = ``;
        switch (optionSelected)
        {
          case "atk":
          return `<h2>${c.name}</h2> Attack`;
          break;
        }
        return `test`;
      }
      });  
      
    }
    html += `</div>`;
    return html;
  }
}
