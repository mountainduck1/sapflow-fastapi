# 1️⃣ Python 3.9 공식 이미지 사용
FROM python:3.9

# 2️⃣ 작업 디렉토리 설정
WORKDIR /app

# 3️⃣ 필요한 파일 복사 (FastAPI 및 모델 관련 파일)
COPY requirements.txt .  
RUN pip install --no-cache-dir -r requirements.txt

# 4️⃣ 애플리케이션 코드 복사
COPY . .

# 5️⃣ 모델 파일이 있는 폴더 생성 후 복사
RUN mkdir -p /app/model
COPY ./model/xgboost_model.json /app/model/xgboost_model.json

# 6️⃣ FastAPI 실행 (Uvicorn 사용)
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
