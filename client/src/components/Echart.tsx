import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

// 定义传入数据的类型（根据实际需求调整）
interface ChartData {
  xdata?: string[];
  series?: echarts.SeriesOption[];
  [key: string]: any; // 支持饼图等其他数据格式
}

interface chartTitle {
  text: string;
  left: string;
}

interface EchartProps {
  style?: React.CSSProperties;
  charData: ChartData;
  isAxisChart?: boolean; // true: 柱状图, false: 饼图
  charTitle: chartTitle;
}

const Echart: React.FC<EchartProps> = ({ style, charData, isAxisChart = true, charTitle }) => {
  const echartRef = useRef<HTMLDivElement>(null);
  const echartObj = useRef<echarts.ECharts | null>(null);

  // 初始化/更新图表
  useEffect(() => {
    // 1. 确保 DOM 已挂载
    if (!echartRef.current) return;

    // 2. 销毁已有实例，避免重复初始化
    if (echartObj.current) {
      echartObj.current.dispose();
    }

    // 3. 创建新实例
    echartObj.current = echarts.init(echartRef.current);

    // 4. 深拷贝基础配置，避免污染源对象
    const getOptions = () => {
      if (isAxisChart) {
        // 柱状图配置（深拷贝避免引用污染）
        return {
          tooltip: {
            trigger: "axis",
            formatter: " <br/>{b}: {c} ",
            axisPointer: {
              type: "shadow",
            },
          },

          xAxis: {
            type: "category",
            data: charData.xData || [], // 容错：默认空数组
          },
          yAxis: { type: "value" },
          series: [
            {
              data: charData.yData,
              type: "bar",
            },
          ], // 容错：默认空数组
          title: {
            text: charTitle.text,
            left: charTitle.left,
          },
        };
      } else {
        // 饼图配置
        return {
          tooltip: {
            trigger: "item",
            formatter: " <br/>{b}: {c} ({d}%)",
          },
          series: [
            {
              type: "pie",
              data: charData || [], // 直接使用传入的饼图数据
            },
          ],
          title: {
            text: charTitle.text,
            left: charTitle.left,
          },
        };
      }
    };

    // 5. 设置图表配置
    const options = getOptions();
    echartObj.current.setOption(options);

    // 6. 窗口大小变化时重绘
    const handleResize = () => {
      echartObj.current?.resize();
    };
    window.addEventListener("resize", handleResize);

    // 7. 组件卸载时清理
    return () => {
      echartObj.current?.dispose(); // 销毁实例
      window.removeEventListener("resize", handleResize); // 移除事件监听
      echartObj.current = null;
    };
  }, [charData, isAxisChart]); // 依赖变化时更新图表

  return <div style={style} ref={echartRef} />;
};

export default Echart;
