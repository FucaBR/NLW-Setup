import { Check, FileTsx } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from 'react'
import dayjs from "dayjs";
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function NewHabitForm() {
    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

  async function createNewHabit(event: FormEvent) {
    event.preventDefault()
    console.log(title, weekDays)

  
     
if(!title || weekDays.length === 0){
  return 
} {
  api.post('habits', {
    title,
    weekDays
  }) 

  setTitle('')
  setWeekDays([])

  alert('Hábito criado com sucesso')
}
}

function handleToggleWeekDay(weekDay: number) {
    if(weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay)
      setWeekDays(weekDaysWithRemovedOne)
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay]
      setWeekDays(weekDaysWithAddedOne)
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual o seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="Ex: Excercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={title}
        onChange={event => setTitle(event.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">Qual a recorrência?</label>

      <div className="mt-3 flex flex-col gap-3 transition-colors">
        {availableWeekDays.map((weekDay, index) => {
          return (
            <Checkbox.Root
            key={weekDay} 
            className="flex items-center gap-3 group focus:outline-none"
            checked={weekDays.includes(index)}
            onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className=" text-white leading-tigh">{weekDay}</span>
            </Checkbox.Root>
          );
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center gap-3 justify-center font-semibold bg-green-400 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}