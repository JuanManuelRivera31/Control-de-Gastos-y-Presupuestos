import { v4 as uuidv4 } from 'uuid'
import { DraftExpense, Expense } from "../types"

export type BudgetActions =
    {type: 'add-budget', payload: {budget: number} } |
    {type: 'show-modal'} |
    {type: 'close-modal'} |
    {type: 'add-expense', payload: {expense: DraftExpense}}
    
export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
}

const createExpense = (DraftExpense: DraftExpense) : Expense => { //Recibe Draft sin ID-> Retorna Expense con ID
    return {
        ...DraftExpense,
        id: uuidv4()
    }
}

export const initialState: BudgetState = {
    budget: 0,
    modal: false,
    expenses: []
}

export const budgetReducer = (
    state: BudgetState= initialState,
    action: BudgetActions
) => {

    if(action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if(action.type === 'show-modal') { //Una vez que se presente el evento o la accion vamos a cambiar el modal
        return{
            ...state,
            modal: true
        }
    }
    
    if(action.type === 'close-modal') {
        return{
            ...state,
            modal: false
        }
    }

    if(action.type === 'add-expense') {

         const expense = createExpense(action.payload.expense) //Toma desde el payload lo que está en el form, por ahora sin ID

        return{
            ...state,
            expenses: [...state.expenses, expense],  //Ahora con ID
            modal: false 
        }
    }
    return state
}