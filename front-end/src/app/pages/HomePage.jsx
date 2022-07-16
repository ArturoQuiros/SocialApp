import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useStatsStore } from "../../hooks/useStatsStore";
import { Button } from "flowbite-react/lib/cjs/index.js";
import ReactECharts from 'echarts-for-react';

export const HomePage = () => {

    const {user} = useAuthStore();
    const {statsX, statsY, startLoadingStats } = useStatsStore();
    const [options, setOptions] = useState({});

    useEffect(() => {
      startLoadingStats();
    }, [])

    useEffect(() => {
      loadGraphic();
    }, [statsX])

    const loadGraphic = () => {

      setOptions(
        {
          grid: { top: 8, right: 8, bottom: 24, left: 36 },
          xAxis: {
            type: 'category',
            data: statsX,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: statsY,
              type: 'bar',
              smooth: true,
            },
          ],
          tooltip: {
            trigger: 'axis',
          },
        }
      );

    }

  return (
    <div className="App mb-5">
        <div className="px-6 py-2.5 text-3xl text-center font-bold text-slate-900 mt-4">
          Welcome, {user.firstName} {user.lastName} 
        </div>
        <h1 className="px-6 py-2.5 text-xl font-bold text-slate-900 m-4">Here are your stats:</h1>
        <ReactECharts option={options} className="mb-80"/>

    </div>
  )
}
