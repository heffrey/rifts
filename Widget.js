// Widget.Insert(Target)
// A widget is a static html rendered using a javascript object. It may follow by an input for those options once selected. The selected item will call event handlers and other actions. 
// by default, it is invoked using a WidgetObject extended class, which ensures the presence of a options.
// The icon that is clicked is referred to as an icon.
// The resulting action populates a reliedOn Object, with precomputed data present.
class Widget {
  
  constructor(argv)
  {
    if (argv)
    {
      let name = "widget";
      this.selectClass = argv.selectClass; // e.g. "cardicon"
      let widgets = name + this.selectClass;
      
      this.relyOn = argv.relyOn; // e.g. "character"
      this.fromList = argv.fromList; // e.g. characters
      this.references = "data-" + this.relyOn; //e.g. "data-character"
      this.optionButton = "data-" + this.selectClass; // e.g. "data-cardicon"
      
      this.structCallback = argv.structuredAs;
      
      this.widgetCallback = argv.widget;
      this.postWidgetCallback = argv.postWidget;
      
      
      document.widgets = new Object();
      document.widgets[this.selectClass] = document.getElementsByClassName(this.selectClass);
      
      for (var i = 0; i < document.widgets[this.selectClass].length; i++)
      {
        var w = document.widgets[this.selectClass][i].widget || new Widget();
        try {
          const objectName = document.widgets[this.selectClass][i].attributes[this.references].value;
          const object = this.structCallback(objectName,this.fromList[objectName]);
          
          // cardiconTypes are currently "weapon", "armor", "vehicle", "loot", "magic", "psi"
          const widgetType = document.widgets[this.selectClass][i].attributes[this.optionButton].value;
          
          w.widgetEntryPoint (
          {
            clickPoint: document.widgets[this.selectClass][i],
            target: document.getElementById(`${object.id}-entry`),
            object: object,
            name: this.relyOn,
            options: object.options(widgetType) || [],
            type: widgetType,
            widget: this.widgetCallback(this, object, widgetType),
            callback: this.postWidgetCallback
          }
          )
          
        }
        catch(e)
        {
          console.log(e);
        }
        
      }

    }
  }
  
  // Replace the elements of an Object in a static HTML widget. Returns the populated HTML Widget.
  // 
  // For example:
  // 
  // Widget.html(
  //    staticHTMLWidget,           // HTML markup  
  //    characters[1],              // Character object (extension of WidgetObject)
  //    "character",                
  //    function () { console.log("Finished populating Widget"); }
  //    )
  //
  
  html (staticHtml, object, objectName, callback)
  {
    let w = staticHtml;
    for (var property in object)
    {
      while (w.replace(`{${objectName}.${property}}`,object[property]) != w)
      {
        w = w.replace(`{${objectName}.${property}}`,object[property]);
      }
    }
    if (callback)
    callback();
    return w;
  }
  
  // entryPoint has a listening object (e.g. link), and a target object that is populated with a widget.
  // Optionally, an object can be passed to populate the staticHtml. 
  // 
  // For example:
  // 
  // Widget.formEntryPoint({
  //    clickPoint: clickedObject, 
  //    target: divTarget, 
  //    widget: staticHtml, 
  //    object: object,             // an object to process
  //    name: objectName,           // takes a string describing the object type 
  //    options: [displayOptions],
  //    callback: callback})
  //
  
  widgetEntryPoint (object)
  {
    // add event listener to clickedObject
    this.clickPoint = object.clickPoint;
    this.target = object.target;
    this.callback = object.callback;
    this.options = object.options;
    this.type = object.type;
    
    if (object.object)
    {
      this.object = object.object;
      try
      {
        object.widget = this.html(object.widget, object.object, object.name);
        
      }
      catch (e)
      {
        console.log(e);
      }
    }
    
    this.widget = object.widget;
    
    $(this.clickPoint).click(
    function(clicked){
      clicked.preventDefault();
      
      
      //  TODO: Implement switch
      if (clicked.target.className.lastIndexOf("combat-command") == 0)
        $(object.target.parentElement.parentElement.parentElement.parentElement).modal('show');
        
      object.target.innerHTML = object.widget;
      if (object.options)
      {
        this.widget = object.widget;
        for (var i = 0; i < object.options.length; i++)
        {

          this.widget += `<a class="widget-option btn btn-info text-white btn-sm m-1" data-action="${object.options[i]}" data-${object.name}="${object.object.id}">${object.options[i]}</a>`;
        }
      }        
      object.target.innerHTML = this.widget;
      $(".widget-option").unbind("click");
     
      if(object.callback)
        object.callback(object);
    });
    
  }
  
}