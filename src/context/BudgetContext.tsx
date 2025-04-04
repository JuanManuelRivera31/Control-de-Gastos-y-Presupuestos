import { useReducer, createContext, Dispatch, ReactNode } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
}

type BudgetProviderProps = {
    children: ReactNode //Todo lo que puede renderizar React, al no saber que es
}

export const BudgetContext = createContext<BudgetContextProps>(null!) //La accion de tener el estado global, sabe de donde vienen los datos y el dispatch que es la funcion que va a cambiar el estado global

export const BudgetProvider = ({children} : BudgetProviderProps) => { //Datos que va tener el context

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    return (
        <BudgetContext.Provider 
            value={{ //Context espera estos valores - props y se los pasamos aqui
                state, 
                dispatch
            }}
        >
            {children}

        </BudgetContext.Provider>
    )
 }