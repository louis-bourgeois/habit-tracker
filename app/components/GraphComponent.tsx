"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DailyPoint {
  day: string;
  points: number;
}

export default function GraphComponent() {
  const [data, setData] = useState<DailyPoint[]>([]);
  const [maxDailyPoints, setMaxDailyPoints] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);

  const fetchMonthlyPoints = async () => {
    try {
      const monthRes = await axios.get("/api/points/month");
      setData(monthRes.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des points mensuels", err);
    }
  };

  const fetchHabitsAndComputeMax = async () => {
    try {
      const habitsRes = await axios.get("/api/habits");
      const habits = habitsRes.data;
      const totalMax = habits.reduce(
        (acc: number, habit: any) => acc + habit.difficulte * habit.priorite,
        0
      );
      setMaxDailyPoints(totalMax);
    } catch (err) {
      console.error("Erreur lors de la récupération des habitudes", err);
    }
  };

  // Regroupe les deux fetch dans une fonction unique
  const fetchData = async () => {
    await Promise.all([fetchMonthlyPoints(), fetchHabitsAndComputeMax()]);
  };

  useEffect(() => {
    if (visible) {
      fetchData();
      const intervalId = setInterval(fetchData, 2000); // actualisation toutes les 2 secondes
      return () => clearInterval(intervalId);
    }
  }, [visible]);

  const chartData = {
    labels: data.map((d) => d.day),
    datasets: [
      {
        label: "Points du jour",
        data: data.map((d) => d.points),
        borderColor: "white",
        backgroundColor: "transparent",
        tension: 0.4, // pour une courbe lisse
        fill: false,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#333",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "white",
        },
        min: 0, // valeur minimale toujours à 0
        suggestedMax: maxDailyPoints, // met à jour dynamiquement l'échelle
      },
    },
  };

  return (
    <div className="mt-8">
      <button
        onClick={() => setVisible((prev) => !prev)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {visible ? "Cacher le graphique" : "Afficher le graphique"}
      </button>
      {visible && (
        <div className="mt-4">
          <Line data={chartData} options={options} />
        </div>
      )}
    </div>
  );
}
