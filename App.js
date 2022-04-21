import { useReducer } from "react"
import "./estilo.css"
import DigitoBotones from "./DigitoBotones"
import OperacionBotones from "./OperacionBotones" 
import Digito from "./Digito"


export const ACTIONS = {
ADD_DIGIT: 'add-digit',
CHOOSE_OPERATION: 'choose-operation',
CLEAR: 'clear',
DELETE_DIGIT: 'delete-digit',
EVALUATE: 'evalute',
SIGNOMENOS: 'Signo Menos',
VARIABLE: 'Variable'


}






function reducer(state, { type, payload, action}) {
switch(type){
case ACTIONS.ADD_DIGIT:
if (state.overwrite){

return {

  ...state,
  aactualoperando: payload.digit,
  overwrite: false,
}




}
if(payload.digit == "0" && state.aactualoperando === "0" ){ 
  return state

}
  if(payload.digit == "," && state.aactualoperando.includes(",") ) {
    return state
  
}


 
  return {
 ...state,
 aactualoperando:  `${state.aactualoperando|| ""}${payload.digit}`,


  }
  

case ACTIONS.CHOOSE_OPERATION:
  


if(state.aactualoperando == null && state.ppreviooperando == null){

return state 

  }

  
    if (state.aactualoperando == null){
return {

  ...state,
  operacion: payload.operacion,
}
  }
 


   if (state.ppreviooperando == null){
return {
...state,
operacion: payload.operacion,
ppreviooperando: state.aactualoperando,
aactualoperando: null,
}
   } 


return {
...state,
ppreviooperando: EVALUATE(state),
operacion: payload.operacion,
aactualoperando: null,
}


case ACTIONS.SIGNOMENOS:
 
    if (state.aactualoperando) {
      return { ...state, aactualoperando: (-1 * parseFloat(state.aactualoperando)).toString() };
    }
    if (state.ppreviooperando) {
      return { ...state, ppreviooperando: (-1 * parseFloat(state.ppreviooperando)).toString() };
    }
    return state
  




case ACTIONS.VARIABLE:
  if (state.overwrite){

    return {
    
      ...state,
      aactualoperando: action.vari ,
      overwrite: false,
    }
    
    }
 
    if(action.vari == "i" && state.aactualoperando.includes("i") ) {
      return state
    }
 
    if (state.aactualoperando) {
    return {
    ...state,
    aactualoperando: `${state.aactualoperand}${action.vari}`  
     }
    }
     
    
    















case ACTIONS.CLEAR:
    return {}



case ACTIONS.DELETE_DIGIT:
  if(state.overwrite) {
  return{ 
...state,
overwrite: false,
aactualoperando: null


  }
  }
if(state.aactualoperando == null) return state
if(state.aactualoperando.length === 1){
return {

...state,
aactualoperando: null

}
}

return {

  ...state,
  aactualoperando: state.aactualoperando.slice(0, -1)
}
case ACTIONS.EVALUATE:
if (state.operacion == null || state.aactualoperando == null || state.ppreviooperando == null) {

  return state
}
return {
...state,
overwrite: true,
  ppreviooperando: null,
operacion: null,
aactualoperando: EVALUATE(state)
}


}
}


function EVALUATE ({ aactualoperando, ppreviooperando, operacion}){

const prev = parseFloat(ppreviooperando)
const actual = parseFloat(aactualoperando)
if (isNaN(prev) || isNaN(actual) ) return ""
let computation = ""


switch (operacion){
case "+":
computation = prev + actual
break
case"-":
computation = prev - actual

break
case"*":
computation = prev * actual
break
case"/":
computation = prev / actual
break
case"√":
computation = Math.sqrt(actual)
break



}
return computation.toString()
}



const iinterger = new Intl.NumberFormat("es-es", {

maximumFractionDigits: 0 ,

})


 


function formar(operando) {
  
  
  if (operando == null) return
  const [integer, decimal] = operando.split(',')
  
  if (decimal == null) return iinterger.format(integer)
  return `${iinterger.format(integer)}.${decimal}`

 
}






function App() {
 
 const [{aactualoperando, ppreviooperando, operacion}, dispatch  ] = useReducer(reducer,{})

 
 
 
 
 
 
 return (
   
      <div className="calculadora-grid">
<div className="output">
  <div className="previooperando">{formar(ppreviooperando)}{operacion}</div>
<div className="actualoperando">{formar(aactualoperando)}</div>
</div>

<button className="spantwo" onClick={() => dispatch({type: ACTIONS.CLEAR})}> AC </button>
     
     
      <button  onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}> DEL </button>
     
     
     
      <OperacionBotones operacion ="/" dispatch={dispatch}/>
      
     

      <DigitoBotones digit ="1" dispatch={dispatch}/>
      <DigitoBotones digit ="2" dispatch={dispatch}/>
      <DigitoBotones digit ="3" dispatch={dispatch}/>
     
      <OperacionBotones operacion ="*" dispatch={dispatch}/>
      
      <DigitoBotones digit ="4" dispatch={dispatch}/>
      <DigitoBotones digit ="5" dispatch={dispatch}/>
      <DigitoBotones digit ="6" dispatch={dispatch}/>
      
      <OperacionBotones operacion ="+" dispatch={dispatch}/>
      
      <DigitoBotones digit ="7" dispatch={dispatch}/>
      <DigitoBotones digit ="8" dispatch={dispatch}/>
      <DigitoBotones digit ="9" dispatch={dispatch}/>
      
      <OperacionBotones operacion ="-" dispatch={dispatch}/>
      <DigitoBotones digit ="," dispatch={dispatch}/>
      <DigitoBotones digit ="0" dispatch={dispatch}/>
      <OperacionBotones operacion=  "√" dispatch={dispatch}/> 
      <Digito vari=  "i" dispatch={dispatch}/> 
     
      
      
      
      
      
      <button className=  "-/+"  onClick={() => dispatch({type: ACTIONS.SIGNOMENOS})}> -/+ </button>
      
     
     <button className="spantwo" onClick={() => dispatch({type: ACTIONS.EVALUATE})}> = </button>
    
  
      
      
      
      
      
      </div>
  
  
  )
  }

export default App
