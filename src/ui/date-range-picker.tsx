"use client"

import * as React from "react"
import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"
import { cn } from "src/lib/utils"
import { Calendar } from "src/ui/calendar"

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })
  return (
    <div className={cn("grid gap-2 border-2 rounded-lg", className)}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
    </div>
  )
}
