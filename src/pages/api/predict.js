// pages/api/predict.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { temperature, humidity, sunlight } = req.body;

    try {
      // 예측을 위한 백엔드 API 요청
      const response = await axios.post('http://localhost:5000/predict', {
        temperature,
        humidity,
        sunlight,
      });

      res.status(200).json(response.data); // 예측 결과 반환
    } catch (error) {
      res.status(500).json({ error: '예측 API 요청 실패' });
    }
  } else {
    res.status(405).json({ error: '메소드 허용되지 않음' });
  }
}
