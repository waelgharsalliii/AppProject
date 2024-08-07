import Chart from "chart.js/auto";
import { useEffect } from 'react';
import { useRef } from 'react';



const DonutChart = ({ data,options }) => {



    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
          const newChartInstance = new Chart(chartRef.current, {
            type: "pie",
            data,
            options
          });
    
          return () => {
            newChartInstance.destroy();
          };
        }
      }, [data,options]);
    
      return <canvas ref={chartRef} />;
};

export default DonutChart;