import React, { memo, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

const RadialChart = ({ category, goal, achievement, theme }) => {
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
              offsetY: -36,
              fontWeight: 1000,
            },
            value: {
              formatter: function (val) {
                return `${Math.floor(val * 10)/10}%`;
              },
              color: theme,
              fontSize: '3rem',
              fontWeight: 600,
              show: true,
              offsetY: 25,
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
      <div className="absolute left-[41%] top-[38%] translate-x-[-50%] text-center flex flex-col items-center">
        <div className="text font-ibm font-bold">
          {`${parseInt(achievement)}${category === "기상" ? 'd' : 'm'} `}/{` ${parseInt(goal)}${category === "기상" ? 'd' : 'm'}`}
        </div>
      </div>
    </div>
  )
}

export default memo(RadialChart)