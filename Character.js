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
  
  addExp(exp)
  {
    this.exp += Number(exp);
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
  
  
  // TODO: Generic Prototypes for WidgetObjectType
  doAction(action)
  {
    
    
  }
  
  
  // mapped from widget icons (e.g. character-command)
  options(type)
  {
    switch (type)
    {
      case "weapon":
        return [
          "addWeapon", 
          "dropWeaopn",
          "viewWeapons"];
          
      case "armor":
        return [
          "equipArmor"];
          
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