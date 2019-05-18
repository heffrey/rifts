const expTables = 
{ "grunt": 
  [
    { lvl: 1, max: 1950},
    { lvl: 2, max: 3900},
    { lvl: 3, max: 8800},
    { lvl: 4, max: 17600},
    { lvl: 5, max: 25600},
    { lvl: 6, max: 35600},
    { lvl: 7, max: 50600},
    { lvl: 8, max: 70600},
    { lvl: 9, max: 95600},
    { lvl: 10, max: 125600},
    { lvl: 11, max: 175600},
    { lvl: 12, max: 225600},
    { lvl: 13, max: 275600},
    { lvl: 14, max: 325600},
    { lvl: 15, max: 375600}
  ]
};

var characters = [];
var characterAutoIncrement = 0;

class Character 
{ // create a Character object, or clone based on another character object.
  // constructor(id, [characterObject])
  constructor(argv)
  {
    this.id = argv;
    let character = new Object();
    
    if (arguments.length > 1) //characterObject parameter is supplied
    {
      character = arguments[1];
      for (var attr in character)
      { 
        this[attr] = character[attr];
      }
      this.id = arguments[0];
    }
    
    this.name = String(this.name);
    this.id = Number(this.id);
    
    // calculated values
    this.nextxp = this.nextLvlXp();
    
    this.hppct = this.hitpointPercentage();
    this.sdcpct = this.sdcPercentage();
    
    // populated values
    this.maxhp = this.maxhp || this.hp;
    this.maxsdc = this.maxsdc || this.sdc;
    
    this.maxppe = this.maxppe || this.ppe;
    this.maxisp = this.maxisp || this.isp;
    
    this.credits = this.credits || 0;
    
    
  }
  
  getExpType()
  {
    this.exptype = "grunt";
    return this.exptype;
  }
  
  nextLvlXp()
  {
    let i = 0;
    this.exp = Number(this.exp);
    while (expTables["grunt"][i].max < this.exp) 
    {
      i++;
      
      if (expTables["grunt"][i].max >= this.exp)
      break;
    }
    if (this.lvl != expTables["grunt"][i].lvl)
    this.lvl = expTables["grunt"][i].lvl;
    
    return expTables["grunt"][i].max + 1;
  }
  
  addCredits(credits)
  {
    this.credits = Number(this.credits) + Number(credits);
    return this.credits;
  }
  
  onLevel()
  {
    $(`span.lvl[data-character=${this.id}]`).html(this.lvl);
    alert(this.lvl);
    return true;
  }
  
  
  
  addExp(exp)
  {
    this.nextxp = this.nextLvlXp();
    while ((Number(exp) + Number(this.exp)) > Number(this.nextxp))
    { 
      exp = Number(exp) + Number(this.exp) - Number(this.nextxp);
      this.exp = this.nextxp;
      this.nextxp = this.nextLvlXp();
      if (this.onLevel())
      $(`span.exp[data-character=${this.id}]`).html(this.exp + "/" + 
      this.nextxp + " xp");
    } 
    
    if ((Number(exp) + Number(this.exp)) > Number(this.nextxp))
    {
      if (this.exp = Number(this.exp) + Number(exp))
      if (this.onLevel())
      $(`span.exp[data-character=${this.id}]`).html(this.exp + "/" + 
      this.nextxp + " xp");
    } 
    else
    if (this.exp = Number(this.exp) + Number(exp))
    $(`span.exp[data-character=${this.id}]`).html(this.exp + "/" + 
    this.nextxp + " xp");
    
    
    // todo logic to level
    this.updateChar(this);
    return this.exp;
  }
  
  dealDamageSdc(amt)
  {
    
  }
  
  progressToLevel()
  {
    return this.exp / this.nextLvlXp() * 100;
  }
  
  hitpointPercentage()
  {
    this.hp = Number(this.hp);
    this.maxhp = Number(this.maxhp)
    if (this.hp > this.maxhp)
    this.maxhp = this.hp;
    this.hppct = this.hp / this.maxhp;
    return this.hp / this.maxhp * 100;
  }
  
  sdcPercentage()
  {
    this.sdc = Number(this.sdc);
    this.maxsdc = Number(this.maxsdc)
    if (this.sdc > this.maxsdc)
    this.maxsdc = this.sdc;
    this.sdcpct = this.sdc / this.maxsdc;
    return this.sdc / this.maxsdc * 100;
  }
  
  updateChar(c, callback)
  {
    var character = c;
    try 
    {
      characters[Number(character.id)] = character;
      localStorage.setItem("characters",JSON.stringify(characters));
    }
    catch (e)
    {
      console.error(e)
    }
    if (callback)
    callback();
  }
  
  
  // TODO: Generic Prototypes for WidgetObjectType
  doAction(action, character, element, callback)
  {
    switch (action)
    {
      case "addWeapon":
      let f0 = new Form("add-weapon" + character.id);
      element.parentNode.innerHTML = f0.quickForm(
      [
        {inputr: "Weapon"}, 
        {inputr: "Range (yards)"}, 
        {inputr: "Damage"}, 
        {input: "Payload"}
      ]);
      $.get("weapons.json", function(data){
        $("[name=weapon]").typeahead({ source:data });
      },'json');
      $('#add-weapon'  + character.id).submit(
      function(a) { 
        a.preventDefault();
        var w = $('#add-weapon'  + character.id).serializeObject();
        if (w["weapon"])
        {       
          let c = new Character();
          character.weapon[character.weapon.length] = w;
          c.updateChar(character);
          $(this).fadeOut();
        }
      });
      break;
      
      case "dropWeapon":
      let f1 = new Form("drop-weapon" + character.id);
      element.parentNode.innerHTML = f1.quickForm(
      [
        {opt: "Drop", list: character.weapon, index: "weapon"}
      ]);
      $('#drop-weapon' + character.id).submit(
      function(a) { 
        a.preventDefault();
        let c = new Character();
        let w = $('#drop-weapon' + character.id).serializeObject();
        delete character.weapon[w["drop"] - 1];
        c.updateChar(character);
        $(this).fadeOut();
      });
      break;
      
      case "viewWeapons":
      let f2 = new Form("view-weapon" + character.id);
      element.parentNode.innerHTML = f2.quickForm([{
        list: character.weapon, 
        index: "weapon",
        index2: "damage"
      }
      ]);
      
      break;
      
      case "gainExp":
      let f3 = new Form("gain-exp" + character.id);
      element.parentNode.innerHTML = f3.quickForm(
      [
        {number: "Experience"}
      ]);
      $('#gain-exp' + character.id).submit(
      function(a) { 
        a.preventDefault();
        let c = new Character();
        let w = $('#gain-exp' + character.id).serializeObject();
        character.addExp(w["experience"]);
        c.updateChar(character);
        
        
        $(this).fadeOut();
      });
      break;
      
      
      case "spendCredits":
      case "gainCredits":
      let f4 = new Form("spend-credits" + character.id)
      element.parentNode.innerHTML = f4.quickForm(
      [
        {number: "Credits"}
      ]);
      $('#spend-credits' + character.id).submit(
      function(a) { 
        a.preventDefault();
        let c = new Character();
        let w = $('#spend-credits' + character.id).serializeObject();
        if (action == "gainCredits")
        character.credits =  Number(character.credits) + Number(w["credits"]);
        else
        character.credits =  Number(character.credits) - Number(w["credits"]);
        c.updateChar(character);
        $(`span.credits[data-character=${character.id}]`).html(character.credits + " credits");
        $(this).fadeOut();
      });
      break;
      
      default:
      throw `Undefined action '${action}' in doAction of Character.js`;
    }
  }
  
  
  // mapped from widget icons (e.g. character-command)
  options(type)
  {
    switch (type)
    {
      case "weapon":
      return [
        "addWeapon", 
        "dropWeapon",
      "viewWeapons"];
      
      case "armor":
      return [
      "equipArmor","unequipArmor","editHp","editXdc","toggleMDC"];
      
      case "exp":
      return [
        "gainExp"
      ];
      
      case "vehicle":
      return [
        "enterVehicle",
        "exitVehicle"
      ];
      
      case "loot":
      return ["gainLoot", "sellLoot"]
      
      case "psi":
      return ["viewPsi"];
      
      case "magic":
      return ["viewMagic"];
      
      case "credits":
      return [
        "spendCredits",
        "gainCredits"
      ];
      
    }
    
    
  }
}
