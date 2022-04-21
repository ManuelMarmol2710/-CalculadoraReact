import { ACTIONS } from './App'



export default function DigitoBotones({dispatch, vari}) {

return( <button 
onClick = {() => dispatch({ type: ACTIONS.VARIABLE, action: {vari} }) }
>
{vari}
</button>

)

}
