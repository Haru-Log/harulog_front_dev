import React, { memo, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

const RadialChart = ({ category, goals, achievements, theme }) => {

  const [goal, setGoal] = useState(1)
  const [achievement, setAchievement] = useState(0)

  const [chartState, setChartState] = useState({
    series: [0],
    options: {
      chart: {
        height: 500,
        type: 'radialBar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -270,
          endAngle: 90,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '30px'
            },
            value: {
              formatter: function (val) {
                return parseInt(val * 10) / 10 + "%";
              },
              color: '#111',
              fontSize: '36px',
              show: true,
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
    setChartState({ ...chartState, series: [achievement / (goal?goal:1) * 100] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [achievement, goal])


  return (
    <>
      <Chart
        options={chartState.options}
        series={chartState.series}
        type="radialBar"
        height={500}
        width={500}
      />
    </>
  )
}

export default memo(RadialChart)