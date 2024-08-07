import Chart from "chart.js/auto";
import { useEffect } from 'react';
import { useRef } from 'react';

const BarChart = ({ data } ) => {


    const chartRef = useRef(null);


    useEffect(() => {
        if (chartRef.current) {
          const newChartInstance = new Chart(chartRef.current, {
            type: "bar",
            data,
          });
    
          return () => {
            newChartInstance.destroy();
          };
        }
      }, [data]);

  

      return <canvas ref={chartRef} />;
};


export default BarChart;