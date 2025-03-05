# Python 3.9이 포함된 공식 이미지 사용
FROM python:3.9

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 파일 복사
COPY requirements.txt .

# Python 패키지 설치
RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 파일 복사
COPY . .

# FastAPI 실행 (uvicorn 사용)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
