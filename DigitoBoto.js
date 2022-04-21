import { ACTIONS } from './App'



export default function DigitoBotones({dispatch, menos}) {

return( <button 
onClick = {() => dispatch({ type: ACTIONS.SIGNOMENOS, payload: {menos} }) }
>
{menos}
</button>

)

}
