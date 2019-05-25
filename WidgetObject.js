class WidgetObject 
{
  constructor(argv)
  {
    this.id = argv;
    let obj = new Object()
    
    if (arguments.length > 1)
    {
      let obj = arguments[1]
      
      for (var attr in obj)
      {
       this[attr] = obj[attr];
      }
      
      this.id = arguments[0];
    }
        
    if (this.populate)
      this.populate();
    
    if (this.calculate)
      this.calculate();    
  } 
}