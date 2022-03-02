class CalcController {
    constructor() {
        this._operations = [];
        this._display = document.querySelector("#display");
        this.audio = new Audio("click.mp3");
        this._isToggleAudio = true;
        this._lastNumber = '';
        this._lastOperator = "";
        this.initalizeCaculator();
        
        

    }
    set lastOperator(value) {
        this._lastOperator  = value;
     }
     get lastOperator() {
         return this._lastOperator;
     }
    set lastNumber(value) {
       this._lastNumber  = value;
    }
    get lastNumber() {
        return this._lastNumber;
    }
    set isToggleAudio(value) {
        if(typeof value !== "boolean") {
            throw new TypeError("isToogleAudio deve receber um valor bolean");
            return;
        }
        this._isToggleAudio = value;
    }
    get isToggleAudio() {
        return this._isToggleAudio;
    }

    toggleAudio() {
        this.isToggleAudio = !this.isToggleAudio;
    }
   playAudio() {
    if(this.isToggleAudio) {
        this.audio.currentTime = 0;
       this.audio.play();
    }
   }
        

    get display() {
    return this._display.innerHTML;

    }
   
    set display(value) {
        this._display.innerHTML = value;
    }
    initalizeCaculator() {
        this.iniTializeButtons();
        this.initKeyboard();
    }
    getLastItemOperation() {
        return this._operations[this._operations.length - 1];
    }
    setLastItemOperation(value) {
    this._operations[this._operations.length - 1] = value;
    }
   
    iniTializeButtons() {
       
        document.querySelectorAll(".btn").forEach( btn => {
           
            btn.addEventListener("click", e => {
            this.executeButton(btn.innerHTML);
            });
           })
    }
    isOperator(value) {
        return ['+', '%', '/', '-', '√', '*','x²','¹/x'].indexOf(value) > -1 ;
    }

    executeButton(value) {
       console.log(value);
        switch(value.toLowerCase()) {
            case '+':
            case '-':    
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
              this.addOperation(value);
              break;
            case '÷':
                this.addOperation("/");
                break;
            case 'x':
                this.addOperation("*");
                break;
            case 'ce':
               this.clearEntry();
               break;
            case "c":
               this.clearAll();
               break;
            case "←":
            case "backspace":
                this.deleteLastCaracterFromNumber();
                break; 
            case "=":
                   this.calc();
                    break;     
            case '±':
               if(!isNaN(this.getLastItemOperation())) this.changeSinal();
               break;
            case '.':
            case ',':   
              if(isNaN(this.getLastItemOperation()));  this.addDot();
                break;
            case "%":
                this.addOperation("%");
                this.calc();
                break;
            case "√":
                this.addOperation("√");
                this.calc();
                break;
            case 'x²':
                this.addOperation("x²");
                this.calc();
                break;
            case '¹/x':
                this.addOperation("¹/x");
                this.calc();


                    


                                                 
        }
        this.playAudio();
       
        console.log(this._operations);
    }
    clearEntry() {
        this._operations.pop();
        this.setLasNumberToDisplay();
    }
    clearAll() {
        this._operations = [];
        this.setLasNumberToDisplay();
    }
    changeSinal() {
        let {lastNumber,index} = this.getLastNumber();
        this._operations[index] = parseFloat(lastNumber) * -1;
        this._operations[index].toString();
        this.setLasNumberToDisplay();

    }
    addDot() {
        let {lastNumber,index} = this.getLastNumber();
        this._operations[index] = lastNumber.toString() + ".";
        
        this.setLasNumberToDisplay();
    }
    calc() {
        console.log('entrei em calc')
        let lastOperator = '';
        this.lastOperator = this.getLastOperator();
        console.log('operador1', this.lastOperator);
        if(this.lastOperator == "%") {
            lastOperator = this._operations.pop();
            let {lastNumber,index} = this.getLastNumber();
            this._operations[index] = lastNumber/100;
            this.lastOperator = '';
            
            this.setLasNumberToDisplay();

         
        }
        if(this.lastOperator == "√") {
            lastOperator = this._operations.pop();
            let {lastNumber,index} = this.getLastNumber();
            this._operations[index] = Math.sqrt(lastNumber);
            this.lastOperator = '';
            
            this.setLasNumberToDisplay();

         
        }
        if(this.lastOperator == "x²") {
            lastOperator = this._operations.pop();
            let {lastNumber,index} = this.getLastNumber();
            this._operations[index] = lastNumber * lastNumber;
            this.lastOperator = '';
            
            this.setLasNumberToDisplay();


        }
        if(this.lastOperator == "¹/x") {
            lastOperator = this._operations.pop();
            let {lastNumber,index} = this.getLastNumber();
            this._operations[index] = 1 / lastNumber;
            this.lastOperator = '';
        }

        
      
        else if(this._operations.length < 3 && this.lastOperator) {
            console.log('aaa');
            let firstitem = this._operations[0];
            this._operations =  [firstitem, this._lastOperator];
            if(this.lastNumber) {
                
               this._operations.push(this.lastNumber);

            }
            else {
                let {lastNumber} = this.getLastNumber();
                this.lastNumber = lastNumber;
                this._operations.push(lastNumber);

            }
            console.log(this._operations);
            let result = eval(this._operations.join("").toString());

            this._operations = [result];
            this.setLasNumberToDisplay();

        }
        
     if(this._operations.length  > 3) {
        lastOperator = this._operations.pop();
        let result = eval(this._operations.join("").toString());
        this._operations = [result, lastOperator];
        this._lastNumber = result;
        console.log('lastNumber', this.lastNumber);
        console.log(this._operations);

     }else if(this._operations.length  == 3) {
        let result = eval(this._operations.join("").toString());
        let {lastNumber} = this.getLastNumber();
        this.lastNumber = lastNumber;
        console.log('lastNumber', this.lastNumber);
        this._operations = [result];
     }
  
    
    this.setLasNumberToDisplay();
    }
    addOperation(value) {
     if(isNaN(this.getLastItemOperation())) {
      
     if(this.isOperator(value) && this._operations.length != 0) {
        this.setLastItemOperation(value);
    }else if(!isNaN(value)) {
        this._operations.push(value); 
        console.log("inserido ultimo");
        this.setLasNumberToDisplay();
      
    }   
     
     } else {
      
       if(this.isOperator(value.toLowerCase())) {
        this._operations.push(value);
        if(this._operations.length  > 3) {
            this.calc();
       }
    }
    
    else {
        
        let lastNumber = this.getLastItemOperation().toString() + value;
        if(lastNumber.length > 2 && lastNumber[0] == '0') lastNumber.slice(0,1);
        this.setLastItemOperation(lastNumber);
        
        this.setLasNumberToDisplay();
    }

     }
     
     console.log(this._operations);
    }
    deleteLastCaracterFromNumber() {
   if(this._operations.length > 0 && !this.isOperator(this.getLastItemOperation())) {

    let {lastNumber, index} = this.getLastNumber();
     console.log('lengtht',lastNumber.toString().length);
    if(parseFloat(lastNumber) < 0 && lastNumber.toString().length == 2 ) {
        console.log('entra aqui');
    this._operations[index] = lastNumber.toString().slice(0,-2);
    }
    else {
        this._operations[index] = lastNumber.toString().slice(0,-1);
    }
    
   

    
    this.setLasNumberToDisplay(); 
   }
   
    }
    getLastNumber() {
        let lastNumber = 0;
        let index = 0;
        for( let i = this._operations.length - 1; i >= 0; i--) {

            if(!isNaN(this._operations[i]) && this._operations[i] != "" ) {
                
                lastNumber = this._operations[i];
                index = i;
                break;
            }
            
    }
    console.log(lastNumber);
    return {lastNumber,index};
}
getLastOperator() {
    let lastOperator;
    
    for( let i = this._operations.length - 1; i >= 0; i--) {

        if(this.isOperator(this._operations[i]) && this._operations[i] != "" ) {
            
            lastOperator = this._operations[i];
            
            break;
        }
        
}
if(!lastOperator) lastOperator = this.lastOperator;
return lastOperator;
}

    setLasNumberToDisplay() {
        let {lastNumber,index} = this.getLastNumber();
        
        this.display = lastNumber; 
}
initKeyboard() {
    document.addEventListener("keydown", e => {
       
     this.executeButton(e.key);
    });
}
    }
  