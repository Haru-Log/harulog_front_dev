import React from 'react'
import CalendarHeatmap from "react-calendar-heatmap"
import './react-calendar-heatmap.css';
import { Tooltip } from 'react-tooltip';
import { shiftDate } from "../../utils/rawDatatoJandi";
import { Jandi } from './../../types/HeatmapData.type';

const today = new Date();

const Heatmap: React.FC<{ data: Jandi[]; categoryMax: any }> = ({ data, categoryMax }) => {

  return (
    <div className="w-full h-fit">
      <CalendarHeatmap
        startDate={shiftDate(today, -(51 * 7 + today.getDay() + 1))}
        endDate={today}
        values={data}
        classForValue={(value: any) => {
          if (!value || Object.values(value.category).length === 0) {
            return 'color-empty';
          } else if (Object.values(value.category).length === 1) {
            if (value.category['기상']) {
              return 'color-기상'
            }
            if (Object.values<number>(value.category)[0] > categoryMax[Object.keys(value.category)[0]] / 4 * 3) {
              return `color-${Object.keys(value.category)[0]}-4`
            }
            else if (Object.values<number>(value.category)[0] > categoryMax[Object.keys(value.category)[0]] / 2) {
              return `color-${Object.keys(value.category)[0]}-3`
            }
            else if (Object.values<number>(value.category)[0] > categoryMax[Object.keys(value.category)[0]] / 4) {
              return `color-${Object.keys(value.category)[0]}-2`
            }
            else {
              return `color-${Object.keys(value.category)[0]}-1`
            }

          }
          else {
            return 'color-multiple'
          }
        }}
        tooltipDataAttrs={(value: any) => {
          return {
            'data-tooltip-id': value.date?.getTime() + "",
          };
        }}
        showWeekdayLabels={true}
      />
      {data && data.map((value: any, idx: any) =>
        <Tooltip
          key={idx}
          id={value.date?.getTime() + ""}
          place="top"
          content={`${value.date?.toISOString().slice(0, 10)} 
          ${(Object.keys(value.category).length === 1)
              ? `${Object.keys(value.category)[0]} ${Object.keys(value.category)[0] === '기상'
                ? Math.floor(Object.values<number>(value.category)[0] / 60) + "시 " + Math.floor(Object.values<number>(value.category)[0] % 12) : Object.values(value.category)[0]}분`
              : Object.keys(value.category).join(', ')
            }`}
        />
      )}

    </div>
  )
}
export default Heatmap

