import React, { memo } from 'react'
import Chart from 'react-apexcharts'

const RadialChart = ({ category, goal, achievement, theme }) => {
  const state = {
    series: [achievement/goal * 100],
    options: {
      chart: {
        height:500,
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
              fontSize: '30px'
            },
            value: {
              formatter: function (val) {
                return achievement;
              },
              color: '#111',
              fontSize: '36px',
              show: true,
            }
          }
        }
      },
      fill: {
        colors:[theme]
      },
      stroke: {
        lineCap: 'round'
      },
      labels: [category],
    },
  };


  return (
    <>
      <Chart
        options={state.options}
        series={state.series}
        type="radialBar"
        height={500}
        width={500}
      />
    </>
  )
}

export default memo(RadialChart)