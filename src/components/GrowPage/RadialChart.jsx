import React, { memo, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

const RadialChart = ({ category, goal, achievement, theme }) => {

  if(category==="기상"){
    console.log(goal, achievement);
  }

  const [chartState, setChartState] = useState({
    series: [0],
    options: {
      chart: {
        type: 'radialBar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -270,
          endAngle: 90,
          offsetX: -30,
          hollow: {
            margin: 0,
            size: '70%',
            image: undefined,
            background: "transparent",
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'back',

          },
          track: {
            background: '#ececec',
            strokeWidth: '100%',
            margin: 0, // margin is in pixels
          },

          dataLabels: {
            show: true,
            name: {
              show: true,
              color: theme,
              fontSize: '1.5rem',
              offsetY: -30,
              fontWeight: 1000,
            },
            value: {
              formatter: function (val) {
                return `${achievement}${category === "기상" ? 'd' : 'm'}`;
              },
              color: theme,
              fontSize: '3rem',
              fontWeight: 600,
              show: true,
              offsetY: 20,
            }
          }
        }
      },
      fill: {
        colors: [theme]
      },
      stroke: {
        lineCap: 'round'
      },
      labels: [category],
      grid: {
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
      }
    },
  }
  )

  useEffect(() => {
    setChartState({ ...chartState, series: [achievement / goal * 100] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goal, achievement])


  return (
    <div className="w-full h-full relative">
      <Chart
        options={chartState.options}
        series={chartState.series}
        type="radialBar"
      />
      <div className="absolute right-[54%] top-[40%] text-center flex flex-col items-center">
        <div className="text font-ibm font-bold">
          {`${parseInt(goal)}${category === "기상" ? 'd' : 'm'}`}
        </div>
      </div>
    </div>
  )
}

export default memo(RadialChart)