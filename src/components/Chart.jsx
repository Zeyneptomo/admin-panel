import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler
} from "chart.js";

import { Line } from "react-chartjs-2";

// SADECE GEREKLİLERİ REGISTER ET
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
);

function Chart() {
    const data = {
        labels: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cts", "Paz"],
        datasets: [
            {
                label: "Satışlar",
                data: [12, 19, 8, 15, 20, 17, 10],
                borderColor: "#4f46e5",
                backgroundColor: "rgba(79, 70, 229, 0.2)",
                fill: true,
                tension: 0.4
            }
        ]
    };

    return (
        <div className="chart-container mt-4">
            <Line data={data} />
        </div>
    );
}

export default Chart;