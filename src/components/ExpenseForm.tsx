import { ChangeEvent, useEffect, useState } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
  
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date(),
  })

  const [error, setError] = useState('')
  const [previousAmount, setPreviousAmount] = useState(0)
  const { dispatch, state, remainingBudget } = useBudget() 

  useEffect(() => {
    if(state.editingId) {
      const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId) //Quiero traerme el que sea igual al state que estoy presionando
      [0]
      setExpense(editingExpense) 
      setPreviousAmount(editingExpense.amount) //Guardamos el valor anterior para comparar si se pasa del presupuesto
    }
  }, [state.editingId]) //Cuando cambie el editingId se va a ejecutar la funcion

  //Funcion aplica para el input y select
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      const {name, value} = e.target; //Desestructuramos el evento para obtener el name y value
      const isAmountField = ['amount'].includes(name) //Verificamos si el campo es amount, si no estamos escribiendo en amount retorna false y detecta que no es tipo amount
      setExpense({
        ...expense,
        [name]: isAmountField ? Number(value) : value //Si es amount convertimos el valor a number, si no lo dejamos como string
    })
  }
  
  const handleChangeDate = (value : Value) => {
    setExpense({
      ...expense,
      date: value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  
    e.preventDefault(); //Evita que se recargue la pagina al enviar el formulario

    //Validar form
    if(Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios')
      return
    }

    //Validar limite
    if( (expense.amount - previousAmount) > remainingBudget) {
      setError('Ese gasto se sale del presupuesto')
      return
    }

    //Agregar o actualizar gasto
    if(state.editingId){ 
      dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}}) //Cuando actualizamos requerimos el id
    } else {
      dispatch({type: 'add-expense', payload: {expense}})
    }

    //Reiniciar el state
    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date(),
    })
    setPreviousAmount(0)
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>

        <legend
          className="uppercase text-center text-2xl font-black 
          border-b-4 border-blue-500 py-2"
        > {state.editingId ? 'Actualizar Gasto' : 'Nuevo Gasto'} </legend>

        {error && <ErrorMessage>{error}</ErrorMessage>}


        <div className="flex flex-col gap-2">
          <label htmlFor="expenseName" className="text-xl">
            Nombre Gasto:
          </label>

          <input 
            type="text" 
            id="expenseName"
            placeholder="Añade el nombre del gasto"
            className="bg-slate-100 p-2"
            name="expenseName"
            value={expense.expenseName} //Conectamos el state con cada uno de los campos
            onChange={handleChange} //Conectamos el evento onChange con la funcion handleChange
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="amount" className="text-xl">
            Cantidad:
          </label>

          <input 
            type="number" 
            id="amount"
            placeholder="Añade la cantidad del gasto: ej. 300"
            className="bg-slate-100 p-2"
            name="amount"
            value={expense.amount}
            onChange={handleChange} 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label 
            htmlFor="category" 
            className="text-xl">
            Categoria:
          </label>

          <select 
            id="category"
            // placeholder="Añade la cantidad del gasto: ej. 300"
            className="bg-slate-100 p-2"
            name="category"
            value={expense.category}
            onChange={handleChange}
            >
            <option value="">-- Seleccione --</option>
            {categories.map(category => (
              <option
                key={category.id} 
                value={category.id}
                >{category.name}</option>
            ))}
            </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="amount" className="text-xl">
            Fecha gasto:
          </label>

          <DatePicker
            className="bg-slate-100 p-2 border-0"
            value={expense.date}
            onChange={handleChangeDate}
          />
        </div>

        <input 
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white
        uppercase font-bold rounded-lg" 
        value={state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}/>


    </form>
  )
}
