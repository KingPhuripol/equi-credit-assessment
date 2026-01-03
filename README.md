# Equi - LegalTech Credit Assessment Platform

A bank-grade LegalTech platform for freelancers and SMEs to get credit assessments using AI-powered OCR and explainable ML.

## 🚀 Features

### Core Features
- ✅ **PDPA Consent Gate** - Legal compliance with Personal Data Protection Act
- ✅ **AI Credit Scoring** - Explainable AI using SHAP values
- ✅ **Equi-Contract Generator** - Automated legal document generation with preview
- ✅ **Fairness Audit Dashboard** - Transparent AI bias monitoring (gender & regional parity)
- ✅ **Right to Dispute** - Manual review request system with reference tracking
- ✅ **SHAP Waterfall Chart** - Visual explanation of credit score factors
- ✅ **PDF Report Generation** - Professional credit assessment reports

### Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4, Shadcn UI
- **Charts**: Recharts
- **PDF**: jsPDF
- **OCR API**: Typhoon OCR (Thai-optimized)
- **Backend**: FastAPI (Python)

## 🐳 Docker Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Typhoon API Key (set as environment variable)

### Run with Docker

1. **Set your API key**:
\`\`\`bash
export TYPHOON_API_KEY="your-api-key-here"
\`\`\`

2. **Build and run**:
\`\`\`bash
docker-compose up --build
\`\`\`

3. **Access the services**:
- Frontend: http://localhost:3002
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Stop the services
\`\`\`bash
docker-compose down
\`\`\`

## 💻 Local Development

### Frontend (Web)

\`\`\`bash
cd web
npm install
npm run dev
\`\`\`

Open http://localhost:3000

### Backend (API)

\`\`\`bash
cd api
pip install -r requirements.txt
uvicorn main:app --reload
\`\`\`

API available at http://localhost:8000

## 📁 Project Structure

\`\`\`
.
├── web/                    # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   │   ├── page.tsx           # Landing page
│   │   │   ├── assessment/        # Credit assessment flow
│   │   │   └── fairness/          # AI fairness audit
│   │   ├── components/    # React components
│   │   │   ├── ConsentModal.tsx   # PDPA consent
│   │   │   ├── ContractGenerator.tsx
│   │   │   ├── Waterfall.tsx      # SHAP visualization
│   │   │   └── ui/                # Shadcn components
│   │   └── lib/           # Utilities
│   │       ├── api.ts             # API client
│   │       ├── pdfGenerator.ts    # PDF export
│   │       └── utils.ts
│   ├── Dockerfile
│   └── package.json
├── api/                    # FastAPI backend
│   ├── main.py            # API endpoints
│   ├── ocr.py             # Typhoon OCR integration
│   ├── model.py           # Credit scoring model
│   ├── industry.py        # Industry classification
│   ├── Dockerfile
│   └── requirements.txt
└── docker-compose.yml
\`\`\`

## 🎨 Design System

**Branding**: "Trust & Justice" (Bank-Grade Professional)

- **Primary**: \`#4E2A84\` (Royal Purple - inspired by SCB)
- **Secondary**: \`#6C757D\` (Slate Grey - inspired by KKP)
- **Background**: Clean White with subtle purple gradients

## 🔐 Environment Variables

### Frontend (.env.local)
\`\`\`bash
NEXT_PUBLIC_API_BASE=http://localhost:8000
\`\`\`

### Backend
\`\`\`bash
TYPHOON_API_KEY=your-api-key-here
\`\`\`

## 📊 User Flow

1. **Landing Page** → User clicks "Start Assessment"
2. **PDPA Consent** → User accepts data processing terms
3. **Upload Documents** → User uploads bank statements/receipts
4. **Processing** → OCR + AI analysis
5. **Results Dashboard**:
   - Credit Score Gauge
   - Risk Grade
   - SHAP Waterfall (explainability)
   - Recommended Loan Amount
   - Dispute Button (manual review)
6. **Contract Generation** → Preview & download legal agreement
7. **PDF Export** → Download full credit report

## 🏆 Competitive Advantages

1. **Legal Compliance**: Built-in PDPA consent + dispute mechanism
2. **Transparency**: AI fairness dashboard with gender/regional parity metrics
3. **Explainability**: SHAP values show why each score was given
4. **Automation**: Instant contract generation
5. **Thai Market**: Optimized for Thai language OCR and banking formats

## 📝 License

Proprietary - Equi Platform

## 👥 Team

Built for LegalTech/FinTech innovation challenges.

---

**Made with ❤️ using Next.js, FastAPI, and Typhoon AI**
