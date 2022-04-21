import { ACTIONS } from './App'



export default function OperacionBotones({dispatch, operacion}) {

return( <button 
onClick = {() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: {operacion} }) }
>
{operacion}
</button>

)

}
