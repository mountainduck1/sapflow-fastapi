"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import axios from "axios";

export default function SapFlowDashboard() {
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(60);
  const [solarRadiation, setSolarRadiation] = useState(300);
  const [prediction, setPrediction] = useState(null);
  const [chartData, setChartData] = useState([]);

  const fetchPrediction = async () => {
    try {
      const response = await axios.post("http://localhost:8000/predict", {
        temperature,
        humidity,
        solarRadiation,
      });
      setPrediction(response.data.prediction);
      setChartData(response.data.chartData);
    } catch (error) {
      console.error("Prediction API error:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sap Flow Prediction Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label>Temperature (°C)</label>
          <input type="number" value={temperature} onChange={(e) => setTemperature(e.target.value)} className="border p-2 w-full"/>
        </div>
        <div>
          <label>Humidity (%)</label>
          <input type="number" value={humidity} onChange={(e) => setHumidity(e.target.value)} className="border p-2 w-full"/>
        </div>
        <div>
          <label>Solar Radiation (W/m²)</label>
          <input type="number" value={solarRadiation} onChange={(e) => setSolarRadiation(e.target.value)} className="border p-2 w-full"/>
        </div>
      </div>
      <button onClick={fetchPrediction} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Predict Sap Flow
      </button>

      {prediction && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Prediction Result</h2>
          <p>Sap Flow Rate: {prediction} L/h</p>
          <LineChart width={600} height={300} data={chartData}>
            <XAxis dataKey="time" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="actual" stroke="#8884d8" />
            <Line type="monotone" dataKey="predicted" stroke="#82ca9d" />
          </LineChart>
        </div>
      )}
    </div>
  );
}
