# 🚀 Deployment Guide - SimuClinik

## Setup Local Environment

### 1. Create `.env` file (DO NOT COMMIT)
```bash
cp .env.example .env
```

Then edit `.env` and add your Gemini API key:
```
GEMINI_API_KEY=your_actual_key_here
PORT=3000
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally
```bash
npm start
```

Visit: `http://localhost:3000`

---

## Deployment Options

### **Option A: Heroku (Easiest)**
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create simuClinik

# Set environment variable
heroku config:set GEMINI_API_KEY=your_api_key

# Deploy
git push heroku main
```

### **Option B: Vercel**
1. Push to GitHub
2. Connect repo at https://vercel.com
3. Add `GEMINI_API_KEY` in Settings → Environment Variables
4. Deploy automatically

### **Option C: Railway**
1. Connect GitHub repo
2. Add `GEMINI_API_KEY` in Variables
3. Deploy

### **Option D: Self-Hosted (VPS/Docker)**
```bash
# Build
npm install
npm start

# Or with Docker:
docker build -t simuClinik .
docker run -e GEMINI_API_KEY=your_key -p 3000:3000 simuClinik
```

---

## Security Checklist ✅

✅ API key in `.env` (never in code)  
✅ `.env` in `.gitignore`  
✅ Backend handles all API calls  
✅ No frontend API key exposure  
✅ CORS enabled for frontend requests  

---

## Troubleshooting

**"Cannot POST /api/gemini"** → Server not running or wrong port  
**"API Error"** → Check `GEMINI_API_KEY` is set and valid  
**"CORS error"** → Ensure `cors` middleware is enabled  

