import React from 'react'
import CalendarHeatmap from "react-calendar-heatmap"
import './react-calendar-heatmap.css';
import { Tooltip } from 'react-tooltip';
import { Jandi } from "../../types/HeatmapData.type";
import { shiftDate } from "../../utils/rawDatatoJandi";

const today = new Date();

const Heatmap: React.FC<{ data: Jandi[] }> = ({ data }) => {

  return (
    <div className="w-full h-fit mt-10">
      <CalendarHeatmap
        startDate={shiftDate(today, -(51 * 7 + today.getDay() + 1))}
        endDate={today}
        values={data}
        classForValue={value => {
          if (!value || value.category[0]==="") {
            return 'color-empty';
          } else if(value.category.length>1){
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
          content={`${value.date?.toISOString().slice(0, 10)} ${value.category}`}
        />
      )}

    </div>
  )
}

export default Heatmap

