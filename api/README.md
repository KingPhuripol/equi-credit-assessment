# CreditNext API (FastAPI)

## Run

```bash
python -m pip install -r api/requirements.txt
export TYPHOON_API_KEY="<YOUR_API_KEY>"
uvicorn api.main:app --reload --port 8000
```

## Endpoints

- `POST /ocr` (multipart file) -> if `TYPHOON_API_KEY` is set: real Typhoon OCR + LLM transaction extraction; otherwise returns simulated transactions
- `POST /analyze` (JSON transactions) -> returns industry + score + SHAP contributions
