import {CircularProgressbar, buildStyles} from "react-circular-progressbar"
import AmountDisplay from "./AmountDisplay"
import { useBudget } from "../hooks/useBudget" //Para poder acceder al state
import 'react-circular-progressbar/dist/styles.css' 

export default function BudgetTracker() {

  const { state, dispatch, totalExpenses, remainingBudget } = useBudget() //Recuperamos los datos del context por medio del state, Disptach si quiero escribir en el state
  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2) 


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
          <CircularProgressbar
              value={percentage} //Porcentaje de gasto
              styles={buildStyles({
                  pathColor: percentage === 100 ? '#DC2626' : '#3B82F6', //Color de la barra
                  trailColor: '#F5F5F5', //Color de la parte vacia de la barra 
                  textSize: 10,
                  textColor: percentage === 100 ? '#DC2626' : '#3B82F6',    
                })}
              text={`${percentage}% Gastado`} //Texto dentro de la barra
              />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
            type="button"
            className="bg-pink-600 w-full p-2 text-white font-bold uppercase rounded-lg"
            onClick={() => dispatch({type: 'restart-app'})} //Resetear el presupuesto
        >
            Resetear App
            
        </button>

        <AmountDisplay 
            label="Presupuesto" 
            amount={state.budget}
        />

        <AmountDisplay 
            label="Disponible" 
            amount={remainingBudget}
        />

        <AmountDisplay 
            label="Gastado" 
            amount={totalExpenses}
        />
      </div>
    </div>
  )
}
