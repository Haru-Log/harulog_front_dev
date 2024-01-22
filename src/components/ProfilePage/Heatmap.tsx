import React from 'react'
import CalendarHeatmap from "react-calendar-heatmap"
import './react-calendar-heatmap.css';
import shiftDate from './../../utils/shiftDate';
import { Tooltip } from 'react-tooltip';

interface Jandi {
  date: Date;
  count: number;
  category: string
}

const today = new Date();

const Heatmap: React.FC<{ data: Jandi[] }> = ({ data }) => {

  return (
    <div className="w-full h-fit mt-10">
      <CalendarHeatmap
        startDate={shiftDate(today, -(51 * 7 + today.getDay() + 1))}
        endDate={today}
        values={data}
        classForValue={value => {
          console.log(value?.category);
          if (!value || !value.count) {
            return 'color-empty';
          }
          return `color-${value.category}`;
        }}
        tooltipDataAttrs={(value: Jandi) => {
          return {
            'data-tooltip-id': value.date.toDateString(),
          };
        }}
        showWeekdayLabels={true}
      />
      {data.map((value) =>
        <Tooltip
          key={value.date.toDateString()}
          id={value.date.toDateString()}
          place="top"
          content={value.date.toISOString().slice(0, 10)}
        />
      )}

    </div>
  )
}

export default Heatmap

