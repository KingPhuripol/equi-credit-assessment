# การ Deploy Equi Credit Assessment Platform

## 🚀 Deploy บน Vercel (Frontend)

### ขั้นตอนที่ 1: เตรียม GitHub Repository

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Equi Credit Assessment Platform"

# Create repository บน GitHub แล้ว push
git remote add origin https://github.com/KingPhuripol/equi-credit-assessment.git
git branch -M main
git push -u origin main
```

### ขั้นตอนที่ 2: Deploy Frontend บน Vercel

1. ไปที่ [vercel.com](https://vercel.com) และ login ด้วย GitHub
2. คลิก "New Project"
3. Import repository `equi-credit-assessment`
4. ตั้งค่า:
   - **Framework Preset**: Next.js
   - **Root Directory**: `web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

5. เพิ่ม Environment Variables:
   ```
   NEXT_PUBLIC_API_BASE=https://your-backend-url.com
   ```

6. คลิก "Deploy"

---

## 🐍 Deploy Backend (FastAPI)

### ตัวเลือก 1: Deploy บน Railway

1. ไปที่ [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. เลือก repository และตั้งค่า:
   - **Root Directory**: `api`
   - **Start Command**: `uvicorn api.main:app --host 0.0.0.0 --port $PORT`

4. เพิ่ม Environment Variables:
   ```
   OPENAI_API_KEY=sk-proj-...
   ```

5. Copy URL ที่ได้ (เช่น `https://equi-api-production.up.railway.app`)

### ตัวเลือก 2: Deploy บน Render

1. ไปที่ [render.com](https://render.com)
2. "New" → "Web Service"
3. Connect GitHub repository
4. ตั้งค่า:
   - **Environment**: Python 3
   - **Build Command**: 
     ```bash
     pip install -r api/requirements.txt && apt-get install -y tesseract-ocr tesseract-ocr-tha
     ```
   - **Start Command**: 
     ```bash
     uvicorn api.main:app --host 0.0.0.0 --port $PORT
     ```

5. เพิ่ม Environment Variables:
   ```
   OPENAI_API_KEY=sk-proj-...
   ```

### ตัวเลือก 3: Deploy บน Fly.io

สร้างไฟล์ `fly.toml`:

```toml
app = "equi-api"

[build]
  dockerfile = "api/Dockerfile"

[env]
  PORT = "8000"

[[services]]
  http_checks = []
  internal_port = 8000
  protocol = "tcp"

  [[services.ports]]
    force_https = true
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443
```

Deploy:
```bash
fly launch
fly secrets set OPENAI_API_KEY=sk-proj-...
fly deploy
```

---

## 🔗 เชื่อม Frontend กับ Backend

หลังจาก deploy backend แล้ว:

1. Copy backend URL (เช่น `https://equi-api.railway.app`)
2. ไปที่ Vercel Dashboard → Project Settings → Environment Variables
3. แก้ไข `NEXT_PUBLIC_API_BASE` เป็น backend URL
4. Redeploy frontend

---

## ✅ Checklist

- [ ] Code อยู่บน GitHub
- [ ] Backend deployed (Railway/Render/Fly.io)
- [ ] Frontend deployed บน Vercel
- [ ] Environment variables ตั้งค่าครบ
- [ ] CORS settings ถูกต้อง (ใน api/main.py)
- [ ] ทดสอบอัพโหลด PDF
- [ ] แชร์ลิงก์ให้คนอื่นทดลองใช้

---

## 🌐 URL สำหรับแชร์

- **Frontend**: https://equi-credit.vercel.app
- **Backend API**: https://equi-api.railway.app
- **API Docs**: https://equi-api.railway.app/docs

---

## 💰 ค่าใช้จ่าย

- **Vercel**: ฟรี (Hobby plan)
- **Railway**: $5/month (หลังจาก free trial)
- **Render**: ฟรี (แต่จะ sleep หลัง 15 นาทีไม่มีคนใช้)
- **Fly.io**: ฟรีได้ 3 apps

---

## 🔐 Security Notes

⚠️ **สำคัญ**: อย่า commit API keys ลง GitHub!

สร้างไฟล์ `.env.example`:
```
OPENAI_API_KEY=your_key_here
NEXT_PUBLIC_API_BASE=https://your-backend-url.com
```

จริงๆ ใช้ Environment Variables บน Vercel/Railway แทน
