
"use strict";

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
    this.sdcmdcpct = this.sdcmdcPercentage();
    
    // populated values
    this.maxhp = this.maxhp || this.hp;
    this.maxsdcmdc = this.maxsdcmdc || this.sdcmdc;
    
    this.maxppe = this.maxppe || this.ppe;
    this.maxisp = this.maxisp || this.isp;
    
    this.dmgtype = this.dmgtype || "SDC";
    
    this.credits = this.credits || 0;    
    
    this.atk = this.atk || 2; // atk per melee
    this.init = this.init || 0; // init bonus
    this.strike = this.strike || 0;
    
    this.weapon = this.weapon || [];
    this.wautoinc = this.wautoinc || 0;
    
    this.armor = this.armor || [];
    
    this.spell = this.spell || [];
    
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
    const f = new Form();
    f.quickAlert(`<strong>${this.name}</strong> has leveled to <strong>level ${this.lvl}</strong>.`);
    return true;
  }
  
  addExp(exp)
  {
    this.nextxp = this.nextLvlXp();
    while ((Number(exp) + Number(this.exp)) >= Number(this.nextxp))
    { 
      exp = Number(exp) + Number(this.exp) - Number(this.nextxp);
      this.exp = this.nextxp;
      this.nextxp = this.nextLvlXp();
      if (this.onLevel())
      $(`span.exp[data-character=${this.id}]`).html(this.exp + "/" + 
      this.nextxp + " xp");
    } 
    
    if ((Number(exp) + Number(this.exp)) >= Number(this.nextxp))
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
    this.hppct = this.hp / this.maxhp * 100;
    return this.hp / this.maxhp * 100;
  }
  
  sdcmdcPercentage()
  {
    this.sdcmdc = Number(this.sdcmdc);
    this.maxsdcmdc = Number(this.maxsdcmdc)
    if (this.sdcmdc > this.maxsdcmdc)
      this.maxsdcmdc = this.sdcmdc;
    this.sdcmdcpct = this.sdcmdc / this.maxsdcmdc * 100;
    return this.sdcmdc / this.maxsdcmdc * 100;
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
  
  // List of attributes that are objects 
  objectAttributes()
  {
  return ["weapon","armor","loot","magic","vehicle","psi"];
  }
  
  doAction(action, character, element, callback)
  {
    
    const f = new Form();
    const c = new Character();
    
    gmLog = gmLog || []; 
    
    switch (action)
    {
      case "addWeapon":
      element.parentNode.innerHTML = f.quickForm( "add-weapon-" + character.id,
      [
        {inputr: "Weapon"}, 
        {number: "Range (yards)"}, 
        {inputr: "Damage"}, 
        {number: "Payload"}
      ]);

      $(".form-control").attr('autocomplete','off');
      $.get("weapons.json", function(data){
        $("[name=weapon]").typeahead({ source:data });
      },'json');
      
      $('#add-weapon-' + character.id).submit(
      function(a) { 
        a.preventDefault();
        var w = $('#add-weapon-' + character.id).serializeObject();
        if (w["weapon"])
        { 
          w.damage = w.damage.toUpperCase();
          
          w.id =  w.id || character.weapon.length;
          character.weapon[w.id] = w;
          c.updateChar(character);
          $(this).fadeOut();
        }
      });
      break;
      
      
      case "dropWeapon":
      element.parentNode.innerHTML = f.quickForm("drop-weapon-" + character.id,
      [
        {opt: "Drop", list: character.weapon, index: "weapon"}
      ]);
      $('#drop-weapon-' + character.id).submit(
      function(a) { 
        a.preventDefault();
        let w = $('#drop-weapon-' + character.id).serializeObject();
        character.weapon[w["drop"]]["deleted"] = true;
        c.updateChar(character);
        $(this).fadeOut();
      });
      break;
      
      
      case "equipArmor":
      element.parentNode.innerHTML = f.quickForm("equip-armor-" + character.id,
      [
        {inputr: "Armor"}, 
        {opt: "Damage type", list: [{type: "MDC"}, {type:"SDC"}], index: "type"},
        {number: "Amount"},
        {btn: "Equip"}
      ]);
      
      
      $(".form-control").attr('autocomplete','off');
      $.get("armor.json", function(data){
        $("[name=armor]").typeahead({ source:data });
      },'json');
      
      $('#equip-armor-' + character.id).submit(
      function(a) { 
        a.preventDefault();
        var ar = $('#equip-armor-' + character.id).serializeObject();
        if (ar["armor"])
        { 
          
          if (ar["damage-type"] == "Damage type" || ar["damage-type"] == "0")
            ar["damage-type"] = "MDC";
          else 
            ar["damage-type"] = "SDC";
          
          
          ar.id =  ar.id || character.armor.length;
          character.armor[ar.id] = ar;
          c.updateChar(character);
          $(this).fadeOut();
        }
      });      
      break; 
      
      
      case "unequipArmor":
      element.parentNode.innerHTML = f.quickForm("unequip-armor-" + character.id,
      [
        {opt: "Unequip", list: character.armor, index: "armor"}
      ]);
      
      $('#unequip-armor-' + character.id).submit(
      function(a) { 
        a.preventDefault();
        let ar = $('#unequip-armor-' + character.id).serializeObject();
        character.armor[ar["unequip"]]["deleted"] = true;
        c.updateChar(character);
        $(this).fadeOut();
      });
      break; 
      
      case "editHp":
      element.parentNode.innerHTML = f.quickForm("edit-hp-" + character.id,
      [
        {number: "Maximum", min: 1, value: character.maxhp}, 
        {number: "Current", value: character.hp}
      ]);
      
      $("#edit-hp-" + character.id).submit(
        (a) => 
        {
          a.preventDefault();
          let hp = $('#edit-hp-' + character.id).serializeObject();
          character.maxhp = hp["maximum"];
          character.hp = hp["current"];
          character.hppct = character.hitpointPercentage();
          c.updateChar(character);          
          $(`span.hp[data-character=${character.id}]`).html(`${character.hp} HP`);
          $(`.progress-bar.hp[data-character=${character.id}]`).css("width",`${character.hppct}%`);
          if (character.hppct < 1)
            $(`.progress-bar.hp[data-character=${character.id}]`).addClass("progress-bar-striped progress-bar-animated");
          else
             $(`.progress-bar.hp[data-character=${character.id}]`).removeClass("progress-bar-animated progress-bar-striped");
        }
      );
      break;
      
      case "editXdc":
      element.parentNode.innerHTML = f.quickForm("edit-xdc-" + character.id,
      [
        {number: "Maximum", value: character.maxsdcmdc}, 
        {opt: "Damage type", list: [{type: "MDC"}, {type:"SDC"}], index: "type"},
        {number: "Current", value: character.sdcmdc}
      ]);
      
      $("#edit-xdc-" + character.id).submit(
        (a) =>
        {
          a.preventDefault();
          let xdc = $('#edit-xdc-' + character.id).serializeObject(); 
          character.dmgtype = xdc["damage-type"] == "0" ? "MDC" : "SDC";      
          character.maxsdcmdc = xdc["maximum"];
          character.sdcmdc = xdc["current"];
          character.sdcmdcpct = character.sdcmdcPercentage();
          c.updateChar(character);          
          $(`span.sdcmdc[data-character=${character.id}]`).html(`${character.sdcmdc} ${character.dmgtype}`);
          $(`.progress-bar.sdcmdc[data-character=${character.id}]`).css("width",`${character.sdcmdcpct}%`);
          if (character.sdcmdcpct < 1)
             $(`.progress-bar.sdcmdc[data-character=${character.id}]`).addClass("progress-bar-striped progress-bar-animated");
          else
             $(`.progress-bar.sdcmdc[data-character=${character.id}]`).removeClass("progress-bar-animated progress-bar-striped");
          console.log($(`.progress-bar.sdcmdc[data-character=${character.id}]`).css())
          
        }
      );
      break;
      
      case "viewWeapons":
      element.parentNode.innerHTML = f.quickForm("view-weapon-" + character.id, [{
        list: character.weapon, 
        index: "weapon",
        index2: "damage",
        noBtn: true
      }
      ]);
 
      $('[data-toggle="popover"]').popover();

      break;
      
      case "viewArmor":
      element.parentNode.innerHTML = f.quickForm("view-armor-" + character.id, [{
        list: character.armor,
        index: "armor",
        index2: "amount",
        index3: "damage-type"}]
      );
      $('[data-toggle="popover"]').popover();
     break;
      
      case "gainExp":
      element.parentNode.innerHTML = f.quickForm( "gain-exp-" + character.id, 
      [
        {number: "Experience"}
      ]);
      $('#gain-exp-' + character.id).submit(
      function(a) { 
        a.preventDefault();
        let w = $('#gain-exp-' + character.id).serializeObject();
        character.addExp(w["experience"]);
        c.updateChar(character);
        $(this).fadeOut();
      });
      break;
      
      
      case "spendCredits":
      element.parentNode.innerHTML = f.quickForm("spend-credits-" + character.id,
      [
        {number: "Credits", max: character.credits }
      ]);
      $('#spend-credits-' + character.id).submit(
      function(a) { 
        a.preventDefault();
        let w = $('#spend-credits-' + character.id).serializeObject();
        if (action == "gainCredits")
        character.credits =  Number(character.credits) + Number(w["credits"]);
        else
        character.credits =  Number(character.credits) - Number(w["credits"]);
        c.updateChar(character);
        $(`span.credits[data-character=${character.id}]`).html(character.credits + " credits");
        $(this).fadeOut();
      });
      break;
      
      
      case "gainCredits":
      element.parentNode.innerHTML = f.quickForm("gain-credits-" + character.id,
      [
        {number: "Credits"}
      ]);
      $('#gain-credits-' + character.id).submit(
      function(a) { 
        a.preventDefault();
        let w = $('#gain-credits-' + character.id).serializeObject();
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
      "equipArmor","unequipArmor","viewArmor","editHp","editXdc"];
      
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
      return ["gainLoot", "buyLoot","sellLoot"]
      
      case "psi":
      return ["viewPsi"];
      
      case "magic":
      return ["viewMagic"];
      
      case "credits":
      return [
        "spendCredits",
        "gainCredits"
      ];
      
      case "character": 
      return ["skills"];
    }
    
    
  }
}
