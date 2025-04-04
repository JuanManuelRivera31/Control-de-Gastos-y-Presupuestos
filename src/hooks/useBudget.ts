import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

//Utilizamos los hooks de react para conectar los que nosotros creamos personalizados

export const useBudget = () => {
    const context = useContext(BudgetContext)
    
    if(!context) {
        throw new Error('useBudget must be used within a BudgetProvider')
    }
    //Error para que no se rompa la app y nos avise que no se esta utilizando dentro del provider
    
    return context
}