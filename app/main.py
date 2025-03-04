from fastapi import FastAPI, HTTPException
import xgboost as xgb
import numpy as np
from pydantic import BaseModel
import os

# FastAPI 앱 초기화
app = FastAPI()

# 5개의 입력 변수 (기온, 습도, 일사량, VPD, 시간)
class InputData(BaseModel):
    temperature: float
    humidity: float
    sunlight: float
    vpd: float
    time: float

# 모델 파일 경로 설정
model_dir = os.path.join(os.getcwd(), "model")  # 모델이 저장될 디렉토리
model_path = os.path.join(model_dir, "xgboost_model.json")

# 모델 디렉토리가 없으면 생성
if not os.path.exists(model_dir):
    os.makedirs(model_dir)
    print(f"📂 모델 디렉토리가 존재하지 않아 생성되었습니다: {model_dir}")

# 모델 파일 확인 및 로드
if not os.path.exists(model_path):
    raise FileNotFoundError(f"🚨 모델 파일이 존재하지 않습니다: {model_path}")

model = xgb.XGBRegressor()
model.load_model(model_path)

@app.post("/predict")
async def predict(data: InputData):
    """ 예측 API - 입력 데이터는 처리 후 저장되지 않음 """
    try:
        input_features = np.array([[data.temperature, data.humidity, data.sunlight, data.vpd, data.time]])
        prediction = model.predict(input_features)
        
        return {"prediction": float(prediction[0])}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"예측 중 오류 발생: {str(e)}")
