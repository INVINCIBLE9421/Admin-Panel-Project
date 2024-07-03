import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

const PieChart = () => {
const storedApiData = JSON.parse(localStorage.getItem("apiData")) || {};
const storageInformation = storedApiData?.dasbhoardPage?.storage || {};
const labels = Object?.keys(storageInformation)
    .reverse()
    .map((key) => `${key} Storage (${storageInformation[key]} GB)`);
const dataset = Object.values(storageInformation).reverse();

const data = {
    labels,
    datasets: [
    {
        data: dataset,
    },
    ],
};
const options = {
    plugins: {
    legend: {
        display: true,
        labels: {
        color: "white",
        },
    },
    tooltip: {
        enabled: true,
    },
    },
};

return (
    <div className="piechart">
    <Pie data={data} options={options} />
    </div>
)
};
export default PieChart;
