import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useStatsStore } from "../../hooks/useStatsStore";
import { Button } from "flowbite-react/lib/cjs/index.js";
import ReactECharts from 'echarts-for-react';

export const HomePage = () => {

    const {user} = useAuthStore();
    const {stats, statsX, statsY, albumCount, photoCount, startLoadingStats } = useStatsStore();
    const [options, setOptions] = useState({});
    const [options2, setOptions2] = useState({});
    const [options3, setOptions3] = useState({});
    const [options4, setOptions4] = useState({});
    const [options5, setOptions5] = useState({});

    useEffect(() => {
      startLoadingStats();
    }, [])

    useEffect(() => {
      loadGraphic();
      loadGraphic2();
      loadGraphic3();
      loadGraphic4();
      loadGraphic5();
    }, [stats])

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
            },
          ],
          tooltip: {
            trigger: 'axis',
          },
        }
      );

    }

    const loadGraphic2 = () => {

      setOptions2(
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
              type: 'line',
              areaStyle: {}
            },
          ],
          tooltip: {
            trigger: 'axis',
          },
        }
      );

    }

    const loadGraphic3 = () => {

      setOptions3(
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
              type: 'line',
              smooth: true,
            },
          ],
          tooltip: {
            trigger: 'axis',
          },
        }
      );

    }

    const loadGraphic4 = () => {

      setOptions4(
        {
          title: {
            text: '',
            subtext: '',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'horizontal',
            left: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: stats,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      );

    }

    const loadGraphic5 = () => {

      setOptions5(
        {
          legend: {
            top: 'top'
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: false, readOnly: false },
              restore: { show: false },
              saveAsImage: { show: false }
            }
          },
          series: [
            {
              name: 'Album Chart',
              type: 'pie',
              radius: '50%', //[50, 250]
              center: ['50%', '50%'],
              roseType: 'area',
              itemStyle: {
                borderRadius: 8
              },
              data: stats
            }
          ]
        }
      );

    }

  return (
    <div className="App mb-5">
        <div className="px-6 py-2.5 text-3xl text-center font-bold text-slate-900 mt-4">
          Welcome, {user.firstName} {user.lastName} 
        </div>
        {
          (statsX[0]) ? (
            <>
              <h1 className="px-6 py-0 text-xl text-center font-bold text-slate-900 my-1">Here are your stats:</h1>
              <h2 className="px-6 py-0 text-lg text-center font-bold text-slate-900 ">Number of albums: {albumCount}</h2>
              <h2 className="px-6 py-0 text-lg text-center font-bold text-slate-900 mb-4">Number of Photos: {photoCount}</h2>
              <div className="flex flex-wrap gap-2">
                <ReactECharts option={options5} style={{height: "50vh", width: "100%"}} className=""/>
                <ReactECharts option={options4} style={{height: "50vh", width: "100%"}} className=""/>
              </div>
              <ReactECharts option={options} style={{height: "50vh", width: "100%"}} className="mb-10"/>
              <ReactECharts option={options2} style={{height: "50vh", width: "100%"}} className="mb-10"/>
              <ReactECharts option={options3} style={{height: "50vh", width: "100%"}} className="mb-10"/>
            </>
          ) : (
            <h1 className="px-6 py-2.5 text-xl text-center font-bold text-slate-900 m-4">You have no stats yet</h1>
          )
        }
        

    </div>
  )
}
