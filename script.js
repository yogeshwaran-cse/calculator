let runningTool=0;
let buffer="0";
let previousOperator;

const screen =document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);

    }
    screen.innerText=buffer;
}

function handleSymbol(Symbol){
    switch(Symbol){
        case 'C':
            buffer='0';
            runningTool=0;
            break;
        case '=':
            if(previousOperator===null){
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator=null;
            buffer=runningTool;
            runningTool=0;
            break;
        case '←':
            if(buffer.length===1){
                buffer='0';

            }else{
                buffer=buffer.substring(0,buffer.length-1);

            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(Symbol);
            break;


    }
}

function handleMath(Symbol){
    if(buffer==='0'){
        return;
    }

    const intBuffer=parseInt(buffer);

    if(runningTool===0){
        runningTool=intBuffer;

    }else{
        flushOperation(intBuffer);
    }
    previousOperator=Symbol;
    buffer='0';
}

function flushOperation(intBuffer){
    if(previousOperator==='+'){
        runningTool+=intBuffer;
    }else if(previousOperator==='−'){
        runningTool-=intBuffer;
    }else if(previousOperator==='×'){
        runningTool*=intBuffer;
    }else if(previousOperator==='÷'){
        runningTool/=intBuffer;
    }

}

function handleNumber(numberString){
    if(buffer==="0"){
        buffer=numberString;
    }else{
        buffer+=numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click',function(event){
        buttonClick(event.target.innerText);

    })
}

init();
