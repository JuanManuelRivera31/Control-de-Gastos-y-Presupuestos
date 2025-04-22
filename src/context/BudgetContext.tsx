import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalExpenses: number
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode //Todo lo que puede renderizar React, al no saber que es
}

export const BudgetContext = createContext<BudgetContextProps>(null!) //La accion de tener el estado global, sabe de donde vienen los datos y el dispatch que es la funcion que va a cambiar el estado global

export const BudgetProvider = ({ children }: BudgetProviderProps) => { //Datos que va tener el context

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0),
        [state.expenses]) //Memo ejecuta cada que cambia el state, total = acumulado, expense = objeto actual

    const remainingBudget = state.budget - totalExpenses

    return (
        <BudgetContext.Provider
            value={{ //Context espera estos valores - props y se los pasamos aqui
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}
        >
            {children}

        </BudgetContext.Provider>
    )
}