import React, { memo, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

const RadialChart = ({ category, goal, achievement, theme }) => {

  const [chartState, setChartState] = useState({
    series: [achievement / goal * 100],
    options: {
      chart: {
        type: 'radialBar',
        toolbar: {
          show: true
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
              fontSize: '1.5rem',
            },
            value: {
              formatter: function (val) {
                return parseInt(val * 10) / 10 + '%';
              },
              color: '#111',
              fontSize: '2rem',
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
    setChartState({ ...chartState, series: [achievement / goal * 100] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goal, achievement])


  return (
    <>
      <Chart
        options={chartState.options}
        series={chartState.series}
        type="radialBar"
      />
    </>
  )
}

export default memo(RadialChart)