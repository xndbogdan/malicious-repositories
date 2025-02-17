import React, { useRef, useState } from 'react'
import { PolarArea } from 'react-chartjs-2'
import { Chart as ChartJS, ChartType, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, RadialLinearScale, ScriptableContext } from "chart.js";
import { TotalEntries } from '../../Data/TotalEntries';
ChartJS.register(ArcElement,CategoryScale,LinearScale,PointElement,LineElement,RadialLinearScale,Title,Tooltip,Filler);

export default function PolarAreaChart() {
  
    // polar area chart data
    const [totalEntries, setTotalEntries] = useState({
        labels: TotalEntries.map((data) => data.entryPoint),
        datasets: [{
            label: 'Entries',
            data: TotalEntries.map((data) => data.total),
        }],
    });

    // polar area chart options
    const totalEntries2 = {
        labels: [
            'Direct link',
            'Via Discord',
            'Via Facebook',
            'Via Telegram',
            'Via Twitter'
        ],
        datasets: [{
            data: [12423, 9324, 11234, 5423, 14223],
            backgroundColor: [
                '#139BAD', //direct link
                '#5865f2', //discord
                '#1877f2', //facebook
                '#0088cc', //telegram
                '#1da1f2' //twitter
            ],
            hoverBackgroundColor: [
                '#139BAD', //direct link
                '#5865f2', //discord
                '#1877f2', //facebook
                '#0088cc', //telegram
                '#1da1f2' //twitter
            ]
        }]
    };

    const options = {
        type: 'polarArea' as ChartType,
        responsive: true,
        maintainAspectRatio: true,
        backgroundColor: [
            '#139BAD', //direct link
            '#5865f2', //discord
            '#1877f2', //facebook
            '#0088cc', //telegram
            '#1da1f2' //twitter
        ],
        borderColor: "rgba(255,255,255,0.3)"
    };
  
    return (
        <PolarArea data={totalEntries2}/>
    )
}