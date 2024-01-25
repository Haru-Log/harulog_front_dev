import React from 'react'
import CalendarHeatmap from "react-calendar-heatmap"
import './react-calendar-heatmap.css';
import { Tooltip } from 'react-tooltip';
import { Jandi } from "../../types/HeatmapData.type";
import { shiftDate } from "../../utils/rawDatatoJandi";

const today = new Date();

const Heatmap: React.FC<{ data: Jandi[] }> = ({ data }) => {

  return (
    <div className="w-full h-fit">
      <CalendarHeatmap
        startDate={shiftDate(today, -(51 * 7 + today.getDay() + 1))}
        endDate={today}
        values={data}
        classForValue={value => {
          if (!value || value.category[0]==="") {
            return 'color-empty';
          } else if(!isNaN(value.category[1])){
            if(value.category[0]==='기상'){
              return `color-${value.category[0]}`
            }
            if(value.category[1] > '3'){
              return `color-${value.category[0]}-4`
            }
            return `color-${value.category[0]}-${value.category[1]}`
          }
          else if(value.category.length>1){
            return 'color-multiple'
          }
          return `color-${value.category[0]}`;
        }}
        tooltipDataAttrs={(value: Jandi) => {
          return {
            'data-tooltip-id': value.date?.getTime()+"",
          };
        }}
        showWeekdayLabels={true}
      />
      {data && data.map((value, idx) =>
        <Tooltip
          key={idx}
          id={value.date?.getTime()+""}
          place="top"
          content={`${value.date?.toISOString().slice(0, 10)} ${value.category.join(', ')}`}
        />
      )}

    </div>
  )
}

export default Heatmap

