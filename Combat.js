"use strict";

var combatHistory = [];

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
    this.characters = [];
    
    combatHistory[combatHistory.length-0] = this;
  }
  
  begin(target)
  {
  
    this.target = target;
    console.log(this);
    
    let html = `<div class=“row”>`;
    
    switch (this.turn)
    {
        case "START":
        getCharacters();
        html += this.getCharacters();
        break;
    }
    html += `</div>`;
    $(target).html(`${html}`);
  }
  
  
  getCharacters()
  {
    const f = new Form();
    let html = f.quickForm("select-characters",
    [
    {select: "Characters", list:characters, index: "name", id: "id"}
    ]);
    return html;
  }
  
  getInitiatives()
  {
    
  }
}
