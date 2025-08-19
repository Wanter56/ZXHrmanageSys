import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { data } from "react-router";
//饼图配置
const pieOption = {
  tooltip: {
    trigger: "item",
  },
  data:[],
  color: ["#0f78f4", "#dd536b", "#9462e5", "#a6a6a6", "#e1bb22", "#39c362", "#3ed1cf"],

};
//柱状图配置
const barOption = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
    },
  ],
};

const Echart: React.FC = ({ style, charData, isAxisChart = true }) => {
  //获取dom实例
  const echartRef = useRef();
  let echartObj = useRef(null);
  useEffect(() => {
    //设置option
    let options;
    echartObj.current = echarts.init(echartRef.current);
    if (isAxisChart) {
      barOption.xAxis.data = charData.xdata;
      barOption.series = charData.series;
      options = barOption;
    } else {
      pieOption.data = charData.data;
      options = pieOption;
    }
  }, [charData]);
  return (
    <div style={style} ref={echartRef}>
      {""}
    </div>
  );
};
export default Echart;
