import { useMemo } from "react"
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"
import 'react-swipeable-list/dist/styles.css';

type ExpenseDetaillProps = {
    expense: Expense
}

export default function ExpenseDetaill({expense} : ExpenseDetaillProps) {
  const { dispatch } = useBudget() 

  //Filtramos sobre el arreglo de categorias y encontramos la coincidente
  const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense]) //Cada que cambie

  const leadingActions = () => ( //Paretensis porque son components y quiero que se vean en pantalla
    <LeadingActions>
      <SwipeAction 
        onClick={() => dispatch({type: 'get-expense-by-id', payload: { id: expense.id } })} 
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => ( //Paretensis porque son components y quiero que se vean en pantalla
    <TrailingActions>
      <SwipeAction 
        onClick={() => dispatch({ type: 'remove-expense', payload: { id: expense.id } })} 
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={1} //Pixeles que quiero que se recorran para que se disparen actions
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
          <div>
            <img src={`/icono_${categoryInfo.icon}.svg`} alt="icono gasto" className="w-20"/>
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
            <p>{expense.expenseName}</p>
            {/* //!Le garantizo que ese valor va existir y no será null */}
            <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString() )}</p> 
          </div>

          <AmountDisplay
            amount={expense.amount}
          />

        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
