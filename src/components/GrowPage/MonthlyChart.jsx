import React, { memo } from 'react'
import ReactApexChart from "react-apexcharts"

const MonthlyChart = () => {

  const state = {
    series: [{
      name: 'Achievement',
      data: [40, 30, 100, 90, 29, 19, 22, 90, 12, 70, 19, 50]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
      },
      stroke: {
        width: 5,
        curve: 'smooth'
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', "November", 'December'],
        labels: {
          formatter: function (value, timestamp, opts) {
            return value?.slice(0, 3);
          }
        }
      },
      title: {
        text: 'Achievement',
        align: 'left',
        style: {
          fontSize: "16px",
          color: '#666'
        }
      },
      colors: ["#92C7CF"],
      yaxis: {
        min: 0,
        max: 100
      }
    },
  };

  return (
    <div className="p-5">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={500}
      />
    </div>
  )
}

export default memo(MonthlyChart)