import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const LineChart = () => {

const storedApiData = JSON.parse(localStorage.getItem("apiData")) || {};
const latestHits = storedApiData.dasbhoardPage?.latestHits || {};
const labels = latestHits.months || [];
const datasets=Object.keys(latestHits)
        .filter((key)=>key!=="months")
        .map((key)=>({
            label:key,
            data:latestHits[key],
            pointBackgroundColor: 'rgb(0,0,0,0)',
            pointBorderColor:'rgb(0,0,0,0)',
            tension:0.5,
        }))

const data = {
labels,
datasets,
};

const options = {
plugins: {
    legend: {
    display: true,
    
    labels: {
        color: 'white',
    },
    },
},
scales: {
    
    x: {
    ticks: {
        color: 'white',
    },
    },
    y: {
    min: 10,
    max: 90,
    ticks: {
        stepSize: 10,
        color: 'white',
    },
    
    },
},
};
return (
    <div className='chart'>
    <Line data={data} options={options} />
    </div>
);
};

export default LineChart;