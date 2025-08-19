import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
//饼图配置
const pieOption = {
  title: {
    text: "Referer of a Website",
    subtext: "Fake Data",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: "50%",
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
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
      pieOption.series.data = charData.data;
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
