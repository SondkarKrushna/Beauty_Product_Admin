import React from 'react'
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const SalesOverview = () => {
    const data = {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec",
        ],
        datasets: [
            {
                label: "Sales Overview",
                data: [350, 500, 350, 200, 300, 400, 350, 500, 420, 600, 250, 350],
                borderRadius: { topLeft: 20, topRight: 20 },
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null;
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, "#8E3579");
                    gradient.addColorStop(1, "#280F22");
                    return gradient;
                },
                barThickness: 10,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                bottom: 20,
            },
        },
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: "#000", font: { size: 12 } },
                border: { color: "#FF007B", width: 1 },
            },
            y: {
                min: 100,
                max: 1000,
                ticks: {
                    color: "#000",
                    stepSize: 100,
                    padding: 10,
                    callback: (value) => value,
                },
                grid: { display: false },
                border: { color: "#FF007B", width: 1 },
                offset: true,
            },
        },
    };

    return (
        <div className="bg-[#FFD7EA36] pt-6   ">
            <h1 className="text-lg ml-6 font-Outfit font-semibold  text-[#280F22] mb-1">Sales Overview</h1>
            <div className="h-[400px]">
                <Bar data={data} options={options} />
            </div>
        </div>

    )
}

export default SalesOverview
