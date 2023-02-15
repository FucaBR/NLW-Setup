import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
import { HabitDay } from "./HabitDay"

const weekDays = [
 'D',
 'S',
 'T',
 'Q',
 'Q',
 'S',
 'S'
] 

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDates = 18 * 7 
const amauntOfDaysToFill = minimumSummaryDates - summaryDates.length

type Summary = {
    id: string,
    date: string,
    amaunt: number,
    completed: number
}[]

export function SummaryTable() {
    const [summary, setSummary] = useState<Summary>([])

    useEffect(() => {

        api.get('summary').then(response => {
            setSummary(response.data)
        })
    }, [])

    return(
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDays, i) => {
                        return(
                            <div key={`$(weekdDay)-$(i)`} className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
                            {weekDays}
                        </div>
                        )
                    })}             
            </div>
                    <div className="grid grid-rows-7 grid-flow-col gap-3">
                            {summary.length > 0 && summaryDates.map(date => {
                                const dayInSummary = summary.find(day => {
                                    return dayjs(date).isSame(day.date, 'day')
                                })
                                return (
                                     <HabitDay
                                        date={date}
                                        amaunt={dayInSummary?.amaunt}
                                        defaultCompleted={dayInSummary?.completed}
                                        key={date.toString()} />) 
                            })}

                           {amauntOfDaysToFill > 0 && Array.from({ length: amauntOfDaysToFill }).map((_, i) => {
                            return (
                                <div key={i} className="w-10 h-10 bg-sinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed">
                           </div>
                           )
                            })}
                    </div>

        </div>
    )
}