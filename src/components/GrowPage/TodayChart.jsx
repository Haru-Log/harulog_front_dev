import React, { memo, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

const RadialChart = ({ category, goals, achievements, theme }) => {

  const [goal, setGoal] = useState(1)
  const [achievement, setAchievement] = useState(0)

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
            background: 'transparent',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
          },
          track: {
            background: "#ececec",
            strokeWidth: '100%',
            margin: 0, // margin is in pixels
          },
          dataLabels: {
            show: true,
            name: {
              show: false,
              color: '#888',
              fontSize: '30px',
            },
            value: {
              formatter: function (val) {
                return parseInt(val * 10) / 10 + "%";
              },
              color: theme,
              fontSize: '6rem',
              fontWeight: 600,
              show: true,
              offsetY: 70,
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
      },
    },
  }
  )

  useEffect(() => {
    const g = goals.reduce((prev, curr) => prev + (curr.category !== "기상" ? curr.goal : 0), 0)
    const a = achievements.reduce((prev, curr) => prev + (curr.category !== "기상" ? curr.achievement : 0), 0)
    setGoal(g)
    setAchievement(a)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [achievements, goals])

  useEffect(() => {
    setChartState({ ...chartState, series: [achievement / (goal ? goal : 1) * 100] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [achievement, goal])

  return (
    <div className="w-[100%] h-[100%] relative">
      <Chart
        options={chartState.options}
        series={chartState.series}
        type="radialBar"
      />
      <div className="absolute right-[40.5%] top-32 text-center flex flex-col items-center">
        <div className="text-6xl font-ibm font-extrabold ">Today</div>
        <div className="text-xl font-ibm mt-5 font-bold">
          어제보다 15% 증가
        </div>
      </div>
    </div>
  )
}

export default memo(RadialChart)