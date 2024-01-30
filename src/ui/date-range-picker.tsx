"use client"

import * as React from "react"
import { DateRange } from "react-day-picker"
import { cn } from "src/lib/utils"
import { Calendar } from "src/ui/calendar"

export function DatePickerWithRangeCreate({
  className,
  date,
  setDate
}: React.HTMLAttributes<HTMLDivElement> & {date: DateRange | undefined, setDate: (date: DateRange | undefined) => void}) {
  return (
    <div className={cn("grid gap-2 border-2 rounded-lg", className)}>
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
    </div>
  )
}

export function DatePickerWithRangeEdit({
  className,
  date,
  setDate
}: React.HTMLAttributes<HTMLDivElement> & {date: DateRange | undefined, setDate: (date: DateRange | undefined) => void}) {
  return (
    <div className={cn("grid gap-2 border-2 rounded-lg", className)}>
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            defaultMonth={date?.from}
          />
    </div>
  )
}