"use strict";

const alert = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
{widget.text} <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span></button></div>`;

class Form
{
  constructor(argv)
  {
  }
  
  formatField(name)
  {
    let newName = name.toLowerCase();
    newName = newName.replace(" ","-");
    newName = newName.replace("(","");
    newName = newName.replace(")","");
    newName = newName.replace("{","");
    newName = newName.replace("}","");
    return newName;
  }
  
  footer(object)
  {
    
  }
  
  quickAlert(argv)
  {
    var w = new WidgetObject();
    w.text= argv;
    
    const widget = new Widget();
    
    $("#top-container").prepend(
    widget.html(
    alert,
    w,
    "widget",
    function() {}
    ));      
  }
  
  quickForm(argv, object)
  {
    let html = `<form id="${argv}" class="form">`;
    let size = "sm"; // Or regular
    let btn = "Enter";
    let noBtn = false;
    
    for (var i = 0; i< object.length; i++)
    {        
      
      let sz = size == "sm" ? "form-control-sm" : "";
      
      if (object[i]["input"])
      {
        let name = object[i]["input"];
        let index = object[i]["index"] || object[i]["input"];
        let field = this.formatField(index);
        let holder = object[i]["holder"]|| name;
        
        html += `<label class="small">${name}</label><input type="text" class="form-control ${sz} order-1" placeholder="${holder}" name="${field}">`;
      } else if (object[i]["inputr"])
      {
        let name = object[i]["inputr"];
        let field = this.formatField(name);
        html += `<label class="small">${name}</label><input type="text" class="form-control ${sz}  order-1" required placeholder="${name}" name="${field}">`;
      }
      else if (object[i]["number"])
      {
        let name = object[i]["number"];
        let max = object[i]["max"] || 1000000;
        let min = object[i]["min"] || 0;
        
        
        let index = object[i]["index"] || object[i]["number"];
        let holder = object[i]["holder"]|| name;
        let field = this.formatField(index);
        
        let value = object[i]["value"] ? `value="${object[i]["value"]}"` : ``;
        
        
        html += `<label class="small">${name}</label><input type="number" required min="${min}" max="${max}" class="form-control ${sz} order-1" placeholder="${holder}" ${value} name="${field}">`;
      }
      else if (object[i]["size"])
      {
        size = object[i]["size"];
      } 
      else if (object[i]["button"] || object[i]["btn"])
      {
        btn = object[i]["button"] || object[i]["btn"];	
      }
      else if (object[i]["noBtn"])
      {
        noBtn = object[i]["noBtn"];
      }
      else if (object[i]["select"])
      {
        let name = object[i]["select"];
        let index = object[i]["index"];
        let id = object[i]["id"];
        let list = object[i]["list"];
        let field = this.formatField(name);
        let info = object[i]["info"] || "";
        html += `<div class="row" width=100%>`
        for (var c = 0; c < list.length; c++)
        {
          if (list[c] && !list[c]["deleted"])
          if(list[c][index])
          {
            let info = "";
            let prompt = "Selected?";
            if (object[i]["widget"])
            {
              const w = new Widget();
              info = w.html(object[i]["widget"][1],list[c],object[i]["widget"][0]);
            }
            if (object[i]["prompt"])
            {
              prompt = object[i]["prompt"];
            }
            html += `<div class="card m-1" style="width: 205px; float: left;"><div class="card-header" id="${list[c][id]}"><h5>${list[c][index]}</h5></div>`;
            html += `<div class="card-body"><div>${info}</div><div class="form-check"><input class="form-check-input" type="checkbox" value="" id="${list[c][id]}" checked><label>${prompt}</label></div></div>`;
            html += `</div>`;
            html += ``;
          }
        }
        html += `</div>`;
      }
      // Example: {opt: "Damage type", list: [{type: "MDC"}, {type:"SDC"}], index: "type"}
      else if (object[i]["opt"])
      {
        let name = object[i]["opt"];
        let index = object[i]["index"];
        let list = object[i]["list"];
        let field = this.formatField(name);
        
        html += `<label class="small">${name}</label>`;
        html += `<select class="custom-select ${sz}" name="${field}">`;
        html += `<option selected>${name}</option>`;
        for (var c = 0; c < list.length; c++)
        {
          if (list[c] && !list[c]["deleted"])
          if(list[c][index])
          html+=`<option value="${c}">${list[c][index]}</option>`;
        }  
        html += `</select>`;
      }
      else if (object[i]["list"])
      {
        let index = object[i]["index"];
        let index2 = object[i]["index2"];
        let index3 = object[i]["index3"] || false;
        let list = object[i]["list"] || [];
        html+=`<div class="container">`;
        if (list.length)
        {
          for (var c = 0; c < list.length; c++)
          {
            html+=`<div class="row small">`;
            if (list[c] && !list[c]["deleted"])
            {
              html+=`<div class="col bg-info text-white rounded m-1" data-toggle="popover" data-trigger="hover"  data-content="${list[c][index]}">${list[c][index].substring(0,11)}.</div><div class="col m-1 bg-info text-white rounded">${list[c][index2]}</div>`;
              if (list[c][index3])
              html+= `<div class="col m-1 bg-info text-white rounded">${list[c][index3]}</div>`
            }
            
            html+=`</div>`;
          } 
        }
        else 
        {
          html += "Empty";
        }
        html += `</div>`;
      }
      
      else {
        console.warn("Invoked quickForm rendered no content.");
      }
    }
    let sz = size == "small" ? "btn-sm" : "";
   // html += `</div><div class="row">`
    html +=  `<button type="submit" class="btn btn-primary ${sz} m-1">${btn}</button></form>`;
   // html += `</div`;
    return html;
  }
}


// Static HTML
const genericForm = `<form id="{widget.id}" class="form-inline"><label>{widget.label}</label><input type="text" class="form-control" placeholder="{widget.placeholder}" name="{widget.id}"><button type="button" class="btn btn-info m-1" data-widget="{widget.id}">&#10003</button></form>`;

const deleteAlert = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
Character <strong>{character.name}</strong> has been deleted. <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span></button></div>`;

const characterForm = `<div class="container-fluid">
<div class="container bg-white rounded" id="character">
<form id="character-form">
<div id="character-accordion">
<div class="card">
<div class="card-header" id="character-overview">
<h5 class="mb-0"> <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-overview" aria-expanded="true" aria-controls="collapse-overview">Overview</button></h5>
</div>
<div id="collapse-overview" class="collapse show" aria-labelledby="character-overview" data-parent="#character-accordion">
<div class="card-body">
<div class="form-row">
<div class="col-4"> <label>Name</label><input type="text" id="character-name" class="form-control order-1" placeholder="Name" name="name"></div>
<div class="col"> <label>True Name</label> <input type="text" class="form-control order-1" id="character-truename" placeholder="True Name" name="truename"> </div>
</div>

<div class="form-row mt-2">
<div class="col"> <label>Sex</label> <input type="text" class="form-control order-1" placeholder="Sex" name="sex">
</div>
<div class="col"> <label>Age</label> <input type="text" class="form-control order-1" placeholder="Age" name="age"> </div>
<div class="col"> <label>Occupation</label> <input type="text" class="form-control" placeholder="Occupation" name="occupation"> </div>
</div>

<div class="form-row mt-2">
<div class="col-5"> <label>O.C.C. / R.C.C.</label> <input type="text" id="character-class" class="form-control" placeholder="Character Class" name="occrcc" autocomplete="off">
</div>
<div class="col">
<label>Height</label>
<input type="text" class="form-control" placeholder="Height" name="height">
</div>
<div class="col">
<label>Weight</label>
<input type="text" class="form-control" placeholder="Weight" name="weight">
</div>
</div>
<div class="form-row mt-2">
<div class="col">
<label>Native Language(s) <a data-toggle="popover" data-trigger="hover" tabindex="-1" class="badge character-command badge-pill badge-primary pointer" title="Languages" data-html="true" data-content="<b>American</b>: English, the universal language of the American continents <br><b>Techno-can</b>: Basic but modified American/English; a universal computer/techno language used in high-tech computer communications and systems. Not used as an everyday spoken language but as a specialized tech-language developed for technical journals and as a universal computer language <br><b>Spanish</b>: the second major tongue of the Americas <br> <b>Japanese <br> Chinese <br> Euro</b>: A blend of Russian, German, and Polish <br><b>Dragonese</b>: Elven from the Palladium world <br><b>Gobblely</b>: Goblin, hob-goblin, orc, and ogre from the Palladium world <br><b>Faerie Speak</b>: Faerie folk as found in the Palladium world">?</a></label>
<input type="text" class="form-control" placeholder="Languages" name="languages">
</div>

</div>
<div class="form-row mt-2">
<div class="col">
<label>Origin</label>
<input type="text" class="form-control" placeholder="Family Origin" name="familyOrigin">
</div>

<div class="col">
<label>Alignment <a data-toggle="popover" tabindex="-1" data-trigger="hover" class="badge character-command badge-pill badge-primary pointer" title="Alignments" data-html="true" data-content="<b>Good:</b> Principled and Scrupulous <br> <b>Selfish:</b> Unprincipled and Anarchist <br> <b>Evil:</b> Miscreant, Aberrant and Diabolic">?</a></label>
<select class="custom-select" name="alignment">
<option selected>Alignment</option>
<option value="1">Principled</option>
<option value="2">Scrupulous</option>
<option value="3">Unprincipled</option>
<option value="4">Anarchist</option>
<option value="5">Aberrant</option>
<option value="6">Miscreant</option>
<option value="7">Diabolic</option>
</select>
</div>
</div>
</div>

</div>
</div>
<div class="card">
<div class="card-header" id="character-attributes">
<h5 class="mb-0">
<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse-attributes" aria-expanded="false" aria-controls="collapse-attributes">
Attributes
</button>
</h5>
</div>
<div id="collapse-attributes" class="collapse" aria-labelledby="collapse-attributes" data-parent="#character-accordion">
<div class="card-body">
<div class="form-row mt-2">
<div class="col">
<label>I.Q. <a data-toggle="popover" data-trigger="hover" tabindex="-1"  class="badge character-command badge-pill badge-primary pointer" title="Intelligence Quotient" data-html="true" data-content="Indicates the character's intelligence.
The exact I.Q. is equal to the I.Q. attribute multiplied times ten. Characters
with an I.Q. of 1 -6 are morons and should be played like the
classic dumb lug. However, having a low I.Q. does not necessarily
make the character a complete idiot. An I.Q. of 7-9 is slightly below
average, but far from an imbecile. An I.Q . of 10- 13 is average, 14-  6
above average. An I.Q. o f 17 o r better i s exceptional, the higher the
number the more brilliant the character. An I.Q. of 16 or higher receives
a one-time bonus (see Attribute Bonus Chart) to all skill percentages,
including O.C.C. Skills, O.C  C . Related Skills and even
Secondary Skills.">?</a></label>
<input type="text" id="character-name" class="form-control form-control-sm" placeholder="3D6" name="iq">
</div>
<div class="col">
<label>M.E. <a data-toggle="popover" tabindex="-1" data-trigger="hover" class="badge character-command badge-pill badge-primary pointer" title="Mental Endurance" data-html="true" data-content="Measures the amount of mental and
emotional stress the character can withstand. M.E. 1 6 or better provides
a bonus to save vs psionic attacks and insanity.">?</a></label>
<input type="text" id="character-name" class="form-control form-control-sm" placeholder="3D6" name="me">
</div>
<div class="col">
<label>M.A. <a data-toggle="popover" data-trigger="hover" tabindex="-1"  class="badge character-command badge-pill badge-primary pointer" title="Mental Affinity" data-html="true" data-content="Represents the character' s I ikeability, personal
charm and charisma. Natural leaders, with an M.A. of 16 or
higher, have a bonus to invoke trust or intimidation in others. A person
with a high M.A. may appear trustworthy to some, but intimidating to
others. This may depend on the character himself or the circumstances
of the situation. At the player' s option, a character with a high M.A.
may choose to be only especially trustworthy or only intimidating. This
explains how your friendly neighborhood ice cream man and some
knife-wielding thug might both have the same high M.A., but use it differently.">?</a></label>
<input type="text" id="character-name" class="form-control form-control-sm" placeholder="3D6" name="ma">
</div>
</div>
<div class="form-row mt-2">
<div class="col">
<label>P.S. <a data-toggle="popover" data-trigger="hover" tabindex="-1"  class="badge character-command badge-pill badge-primary pointer" title="Physical Strength" data-html="true" data-content="This is the raw physical power of a character.
Any character with a P.S. of 16 or better receives a bonus to damage
an opponent in hand to hand combat. This bonus is applied to
punch and kick attacks, as well as handheld weapons such as a club,
knife or sword. It does not apply to the bow and arrow or guns.">?</a></label>
<input type="text" id="character-name" class="form-control form-control-sm" placeholder="3D6" name="ps">
</div>
<div class="col">
<label>P.P. <a data-toggle="popover" data-trigger="hover" tabindex="-1"  class="badge character-command badge-pill badge-primary pointer" title="Physical Prowess" data-html="true" data-content="Shows the degree of dexterity and agility
of the character. A P.P. of 16 or higher is rewarded with bonuses to
strike, parry and dodge.">?</a></label>
<input type="text" id="character-name" class="form-control form-control-sm" placeholder="3D6" name="pp">
</div>
<div class="col">
<label>P.E. <a data-toggle="popover" data-trigger="hover" tabindex="-1"  class="badge character-command badge-pill badge-primary pointer" title="Physical Endurance" data-html="true" data-content="Demonstrates the character's stamina
and durability. The amount of physical punishment and resistance to fatigue,
disease, and poison (and magic too) are determined by P.E. Characters
with a P.E. of 1 6 or higher receive a bonus to save vs coma!
death, disease, poisons/toxins, and magic. But not Demonic Curses or
possession, they are different and separate.">?</a></label>
<input type="text" id="character-name" class="form-control form-control-sm" placeholder="3D6" name="pe">
</div>
</div>
<div class="form-row mt-2">
<div class="col">
<label>P.B. <a data-toggle="popover" data-trigger="hover" tabindex="-1"  class="badge character-command badge-pill badge-primary pointer" title="Physical Beauty" data-html="true" data-content="An indication of the physical attractiveness
of the character. A P.B. of 16 or better is rewarded with a bonus to
charm or impress.">?</a></label>
<input type="text" id="character-name" class="form-control form-control-sm" placeholder="3D6" name="pb">
</div>
<div class="col">
<label>Spd <a data-toggle="popover" data-trigger="hover" tabindex="-1"  class="badge character-command badge-pill badge-primary pointer" title="Speed" data-html="true" data-content="This is how fast the character can run. The character's
Speed x20 is the number of yards or meters he can run in one minute.
Speed x5 is the number of yards/meters covered in a melee round (15
seconds). Dividing the distance covered in a melee round by the character's number of attacks indicates how far he can move on each attack.">?</a></label>
<input type="text" id="character-name" class="form-control form-control-sm" placeholder="3D6" name="spd">
</div>
</div>
</div>

</div>
</div>
<div class="card">
<div class="card-header" id="character-combat">
<h5 class="mb-0">
<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse-combat" aria-expanded="false" aria-controls="collapse-combat">
Combat Details
</button>
</h5>
</div>
<div id="collapse-combat" class="collapse" aria-labelledby="collapse-combat" data-parent="#character-accordion">
<div class="card-body">
<div class="form-row mt-2">
<div class="col">
<label>Atk/Melee<a data-toggle="popover" data-trigger="hover" tabindex="-1" class="badge character-command badge-pill badge-primary pointer" title="Attacks per Melee" data-html="true" data-content="Number of attacks per 15 second melee round.">?</a></label>
<input type="text" id="character-attacks" class="form-control form-control-sm" placeholder="2+" name="atk">
</div>
<div class="col">                                  
<label>Strike Bonus<a data-toggle="popover" data-trigger="hover" tabindex="-1" class="badge character-command badge-pill badge-primary pointer" title="Strike Bonus" data-html="true" data-content="Strike bonus gives a higher chance to hit.">?</a></label>
<input type="text" id="character-strike" class="form-control form-control-sm" placeholder="" name="strike">
</div>
<div class="col">                                  
<label>Initiative Bonus<a data-toggle="popover" data-trigger="hover" tabindex="-1" class="badge character-command badge-pill badge-primary pointer" title="Intiative Bonus" data-html="true" data-content="Initiative bonus gives a higher chance to attack first.">?</a></label>
<input type="text" id="character-initiative" class="form-control form-control-sm" placeholder="" name="init">
</div>
</div>        
<div class="form-row mt-2">
<div class="col">
<label>H.P.<a data-toggle="popover" data-trigger="hover" tabindex="-1" class="badge character-command badge-pill badge-primary pointer" title="Hit Points" data-html="true" data-content="Having rolled up your eight attributes, you will recall that one of them is Physical Endurance (P.E.). The Physical Endurance score indicates your character's base (starting) amount of Hit Points. A P.E. of 8 means eight Hit Points, a P.E. of 14 means fourteen Hit Points. Then roll I D6 and add it to the Hit Point total. This is a first level character's starting Hit Points. Some rare O.C.C.s and R.C.C.s may offer additional Hit Points or S.D.C. as a bonus..">?</a></label>
<input type="text" id="character-hp" class="form-control form-control-sm" placeholder="" name="hp">
</div>
<div class="col">
<label>S.D.C.<a data-toggle="popover" data-trigger="hover" tabindex="-1" class="badge character-command badge-pill badge-primary pointer" title="Physical S.D.C." data-html="true" data-content="Most humans and D-Bees get a certain amount of S.D.C. points to start. Each D.C.C. should indicate how many S.D.C. points a character gets. In the event that it does not, the character starts out w ith 2D6+12 S.D.C., plus any D.C.C. or R.C.C. bonuses. Many Physical skills provide additional S.D.C. All S.D.C. bonuses are accumulative, add them up to get the total S.D.C. of a given character.">?</a></label>
<input type="text" id="character-sdcmdc" class="form-control form-control-sm" placeholder="" name="sdcmdc">
</div>
</div>
<div class="form-row mt-2">
<div class="col">
<label>P.P.E.<a data-toggle="popover" data-trigger="hover" tabindex="-1" class="badge character-command badge-pill badge-primary pointer" title="Potential Psychic Energy" data-html="true" data-content="Every person has some amount of Potential Psychic Energy
(P.P.E.). Most humans and D-Bees have very little (Base: 2D6), because
they have unwittingly spent their P.P.E. on occupational skills,
hobbies and other interests.">?</a></label>
<input type="text" id="character-ppe" class="form-control form-control-sm" placeholder="" name="ppe">
</div>
<div class="col">
<label>I.S.P.<a data-toggle="popover" data-trigger="hover" tabindex="-1" class="badge character-command badge-pill badge-primary pointer" title="Inner Strength Points" data-html="true" data-content="Base Inner Strength Points (I.S.P.) are the character's M.E. +4D6, + lD6+1 per level of experience.">?</a></label>
<input type="text" id="character-isp" class="form-control form-control-sm" placeholder="" name="isp">
</div>
</div>
</div>
</div>
</div>

<!--
<div class="card">
<div class="card-header" id="character-skills">
<h5 class="mb-0">
<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse-skills" aria-expanded="false" aria-controls="collapse-skills">
Skills
</button>
</h5>
</div>
<div id="collapse-skills" class="collapse" aria-labelledby="collapse-skills" data-parent="#character-accordion">
<div class="card-body">
</div>
</div>
</div>
<div class="card">
<div class="card-header" id="character-skills">
<h5 class="mb-0">
<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse-skills" aria-expanded="false" aria-controls="collapse-skills">
Skills
</button>
</h5>
</div>
<div id="collapse-skills" class="collapse" aria-labelledby="collapse-skills" data-parent="#character-accordion">
<div class="card-body">
</div>
</div>
</div>

-->

<div class="card">
<div class="card-header" id="character-progress">
<h5 class="mb-0">
<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse-progress" aria-expanded="false" aria-controls="collapse-progress">
Progress
</button>
</h5>
</div>
<div id="collapse-progress" class="collapse" aria-labelledby="collapse-progress" data-parent="#character-accordion">
<div class="card-body">
<div class="form-row mt-2">
<div class="col">
<label>Level<a data-toggle="popover" data-trigger="hover" tabindex="-1" class="badge character-command badge-pill badge-primary pointer" title="Level" data-html="true" data-content="Character Level">?</a></label>
<input type="text" id="character-level" class="form-control form-control-sm" placeholder="1+" name="lvl">
</div>
<div class="col">
<label>Exp<a data-toggle="popover" data-trigger="hover" tabindex="-1" class="badge character-command badge-pill badge-primary pointer" title="Experience" data-html="true" data-content="Character Experience">?</a></label>
<input type="text" id="character-level" class="form-control form-control-sm" placeholder="" name="exp">
</div>
<div class="col">
<label>Credits<a data-toggle="popover" data-trigger="hover" tabindex="-1" class="badge character-command badge-pill badge-primary pointer" title="Cerdits" data-html="true" data-content="The basic currency of RIFTS&reg.">?</a></label>
<input type="text" id="character-level" class="form-control form-control-sm" placeholder="" name="credits">
</div>
<div class="col">
<label>Salary<a data-toggle="popover" data-trigger="hover" tabindex="-1" class="badge character-command badge-pill badge-primary pointer" title="Salary" data-html="true" data-content="Credits accumulated based on job or occupation.">?</a></label>
<input type="text" id="character-level" class="form-control form-control-sm" placeholder="" name="salary">

<input type="hidden" name="weapon">
<input type="hidden" name="armor">
<input type="hidden" name="vehicle">
<input type="hidden" name="loot">
<input type="hidden" name="magic">
<input type="hidden" name="psionic">
<input type="hidden" name="maxhp">
<input type="hidden" name="maxsdcmdc">
<input type="hidden" name="maxppe">
<input type="hidden" name="maxisp">
<input type="hidden" name="id">


</div>
</div>
</div>
</div>
</div>
</div>
<button type="sumbit" id="player-create" class="btn btn-lg btn-primary p-2">Create</button>
</form>
</div>
</div>`

const combatCard = `<div class="col-sm-0 m-0 ml-2" style="float: left; width=100px;" data-character-card="{character.id}">
<div class="card m-0" style="width: 100px;">
<div class="card-header m-0 p-0">
<small>{character.name} <br />Init: {character.initiative}</small>
</div>

<div class="card-body m-0 p-0">

<small>Atk Ddge Mv</small>

<div class="entry-target" id="{character.id}-entry" data-character="{character.id}"></div> 
<div class="progress m-0" style="height: 24px;"><div class="progress-bar bg-success sdcmdc" data-character="{character.id}" role="progressbar" style="width: {character.sdcmdcpct}%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"><span data-character="{character.id}" class="sdcmdc"> {character.sdcmdc} {character.dmgtype}</span></div></div><div class="progress m-0" style="height: 24px;"><div class="progress-bar bg-danger hp" role="progressbar" style="width: {character.hppct}%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" data-character="{character.id}"><span data-character="{character.id}" class="hp">{character.hp} HP</span></div></div><div class="progress m-0" style="height: 24px;"><div class="progress-bar" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">{character.ppe} PPE</div> </div><div class="progress m-0" style="height: 24px;"><div class="progress-bar bg-warning" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">{character.isp} ISP</div></div></div></div></div>`;

const characterCard = 
`<div class="col" data-character-card="{character.id}"><div class="card m-3" style="width: 275px;"><div class="card-header"><h4>{character.name}</h4><h5>Level: <span data-character="{character.id}" class="lvl" >{character.lvl}</span></h5><h6>{character.occrcc}</h6></div><div class="card-body"><img src="head.png" class="cardicon character-command widget-target" data-character-command="character" data-character="{character.id}" style="position: relative; float: left; margin-right: .85rem;">
<img src="sword.png" class="cardicon character-command m-1 widget-target" data-character-command="weapon" data-character="{character.id}" />
<img src="armor.png" class="cardicon character-command m-1 widget-target" data-character-command="armor" data-character="{character.id}" />
<img src="tire.png" class="cardicon character-command m-1 widget-target" data-character-command="vehicle" data-character="{character.id}" />
<img src="pouch.png" class="cardicon character-command m-1" data-character-command="loot" data-character="{character.id}" />
<img src="magic.png" class="cardicon character-command m-1" data-character-command="magic" data-character="{character.id}" />
</img><img src="psi.png" class="cardicon character-command m-1" data-character-command ="psi" data-character="{character.id}"/>

<br /><br /><div class="entry-target" id="{character.id}-entry" data-character="{character.id}"></div> 
<div class="m-1"><span data-character="{character.id}" class="exp">{character.exp}/{character.nextxp} xp </span><a href="#" class="badge character-command badge-pill badge-primary pointer" data-character="{character.id}" data-character-command="exp">+</a></div><div class="m-1"><span data-character="{character.id}" class="credits">{character.credits} credits </span><a href="#" class="badge character-command badge-pill badge-primary pointer" data-character="{character.id}" data-character-command="credits">+</a></div><div class="progress m-1" style="height: 24px;"><div class="progress-bar bg-success sdcmdc" data-character="{character.id}" role="progressbar" style="width: {character.sdcmdcpct}%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"><span data-character="{character.id}" class="sdcmdc"> {character.sdcmdc} {character.dmgtype}</span></div></div><div class="progress m-1" style="height: 24px;"><div class="progress-bar bg-danger hp" role="progressbar" style="width: {character.hppct}%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" data-character="{character.id}"><span data-character="{character.id}" class="hp">{character.hp} HP</span></div></div><div class="progress m-1" style="height: 24px;"><div class="progress-bar" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">{character.ppe} PPE</div> </div><div class="progress m-1" style="height: 24px;"><div class="progress-bar bg-warning" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">{character.isp} ISP</div></div><div class="btn-group" style="width: 100%;"><button type="button" class="btn btn-info m-1" data-toggle="edit" data-character="{character.id}">Edit</button><button type="button" class="btn btn-danger m-1" data-toggle="confirmation" data-character="{character.id}">Delete</button></div>	</div></div></div>`;


const mainView = `<h1 class="display-4">Introduction</h1>
<p class="lead"><img src="./rifts.jpg" class="rounded float-right p-3 w-auto" alt="">
<strong>RIFTS&reg Campaign Manager</strong> is a light-weight web application that uses your browser's localStorage (similar to cookies), to ensure your campaign can continue right where you left off. Initially developed for fun and to learn more about the Megaverse&reg, this project is open source under the MIT License with no intention to ever make a profit. Please support Palladium Books&reg by purchasing source materials on the <a href="https://palladium-store.com">official website</a>, a licensed PDF resaler such as <a href="https://www.drivethrurpg.com/#">DriveThruRPG</a>, or your local hobby shop.</p>
`;

