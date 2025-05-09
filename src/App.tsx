import BudgetForm from "./components/BudgetForm"
import { useEffect, useMemo } from "react"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"

function App() {

  // const { state, dispatch } = useBudget()
  const { state } = useBudget() //Recuperamos los datos del context por medio del state, Disptach si quiero escribir en el state

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]) //Cada vez que cambie state.budget ejecuta funcion

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses)) //Convertimos el arreglo a string
  }, [state]) //Escuchamos aqui por todos los cambios en el state
  
  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de Gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker/> : <BudgetForm/>}
      </div>

      {isValidBudget && ( //Ternario pero solo cuando se evalua como true la condicion
        <main className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
          <FilterByCategory/>
          <ExpenseList/>
          <ExpenseModal/>
        </main>        
      )}
    </>
  )
}

export default App
