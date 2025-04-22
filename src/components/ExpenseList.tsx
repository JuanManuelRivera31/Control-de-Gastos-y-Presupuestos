import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetaill from "./ExpenseDetaill"

export default function ExpenseList() {

  const { state } = useBudget()

  const filteredExpenses = state.currentCategory ? state.expenses.
    filter(expense => expense.category === state.currentCategory) : state.expenses //La categoria seleccionada, si no, retornamos todos los gastos

  const isEmpty = useMemo(() => filteredExpenses.length === 0, [state.expenses])

  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
      {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No Hay Gastos</p> : (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gatos</p>
          {filteredExpenses.map(expense => ( //Accedemos a cada arreglo de forma individual
            <ExpenseDetaill
              key={expense.id}
              expense={expense}
            />
          ))}
        </>
      )}
    </div>
  )
}