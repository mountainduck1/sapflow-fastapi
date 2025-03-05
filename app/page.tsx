"use client";  // 👈 이 줄 추가
import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [sunlight, setSunlight] = useState('');
  const [vpd, setVpd] = useState('');
  const [time, setTime] = useState('');
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/predict', {
        temperature: parseFloat(temperature),
        humidity: parseFloat(humidity),
        sunlight: parseFloat(sunlight),
        vpd: parseFloat(vpd),
        time: parseFloat(time),
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  return (
    <div>
      <h1>🌱 Sap Flow Prediction Project 🚀</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="number" 
          value={temperature} 
          onChange={(e) => setTemperature(e.target.value)} 
          placeholder="Temperature" 
          required 
        />
        <input 
          type="number" 
          value={humidity} 
          onChange={(e) => setHumidity(e.target.value)} 
          placeholder="Humidity" 
          required 
        />
        <input 
          type="number" 
          value={sunlight} 
          onChange={(e) => setSunlight(e.target.value)} 
          placeholder="Sunlight" 
          required 
        />
        <input 
          type="number" 
          value={vpd} 
          onChange={(e) => setVpd(e.target.value)} 
          placeholder="VPD" 
          required 
        />
        <input 
          type="number" 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
          placeholder="Time" 
          required 
        />
        <button type="submit">Predict</button>
      </form>

      {prediction && <p>Prediction: {prediction} ml</p>}
    </div>
  );
};

export default Home;
