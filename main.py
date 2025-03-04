from fastapi import FastAPI
import xgboost as xgb
import numpy as np
from pydantic import BaseModel
import os

# FastAPI 애플리케이션 객체 생성
app = FastAPI()

# 모델 파일 경로 (방금 저장한 모델 경로 적용)
model_save_path = r"C:\Users\dongshin\OneDrive - Chonnam National University\(프로젝트 데이터)\나무수분흡수 예측모델 개선\2. 일 단위 예측모델 및 검토\예측모델 저장\xgboost_model.json"

# 모델 로드 (모델 경로가 존재하는지 확인)
if os.path.exists(model_save_path):
    model = xgb.XGBRegressor()
    model.load_model(model_save_path)  # 모델 로드
    print("✅ 모델이 성공적으로 로드되었습니다.")
else:
    print("❌ 모델 파일이 존재하지 않습니다.")

# 입력 데이터 모델 정의 (5개 특성으로 변경)
class InputData(BaseModel):
    temperature: float
    humidity: float
    sunlight: float
    vpd: float      # VPD 추가
    time: float     # 시간 추가

# 예측 API 엔드포인트
@app.post("/predict")
async def predict(data: InputData):
    # 입력 데이터를 배열 형식으로 변환 (5개 특성)
    input_features = np.array([[data.temperature, data.humidity, data.sunlight, data.vpd, data.time]])
    
    # 예측 수행
    prediction = model.predict(input_features)
    
    # 예측 값이 numpy.float32 타입이므로, 이를 float으로 변환하여 반환
    return {"prediction": float(prediction[0])}
