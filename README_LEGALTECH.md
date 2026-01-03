# 🏛️ Equi: Enterprise AI Credit Assessment Platform

> **LegalTech Competition Entry 2026**  
> AI-Powered Credit Scoring with Full Legal Compliance & Consumer Protection

[![PDPA Compliant](https://img.shields.io/badge/PDPA-Compliant-success)](https://equi.co.th/legal)
[![BOT Guidelines](https://img.shields.io/badge/BOT-Aligned-blue)](https://equi.co.th/legal)
[![XAI Enabled](https://img.shields.io/badge/XAI-SHAP-purple)](https://equi.co.th/technology)
[![Fairness](https://img.shields.io/badge/Fairness-99.2%25-emerald)](https://equi.co.th/fairness)

---

## 🎯 ภาพรวมโครงการ

**Equi** เป็นระบบประเมินสินเชื่อด้วย AI สำหรับฟรีแลนซ์และผู้ประกอบการรายย่อย ที่ออกแบบมาเพื่อ:

1. **ปกป้องสิทธิผู้บริโภค** ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) และ พ.ร.บ. คุ้มครองผู้บริโภค
2. **โปร่งใสและอธิบายได้** ด้วย Explainable AI (SHAP Values)
3. **ยุติธรรมและไม่เลือกปฏิบัติ** ผ่าน AI Fairness Audit (AIF360)
4. **ปลอดภัยและตรวจสอบได้** ด้วย SHA-256 Digital Signature และ Audit Trail

---

## 🏆 จุดเด่นสำหรับการแข่งขัน LegalTech

### ✅ Legal Compliance (การปฏิบัติตามกฎหมาย)

| กฎหมาย/มาตรฐาน                                         | สถานะ              | รายละเอียด                                                              |
| ------------------------------------------------------ | ------------------ | ----------------------------------------------------------------------- |
| **PDPA** (พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล)              | ✅ Fully Compliant | • Consent Management<br>• Data Minimization<br>• Right to Access/Delete |
| **BOT Guidelines** (ธนาคารแห่งประเทศไทย)               | ✅ Aligned         | • Responsible Lending<br>• Fair Assessment<br>• Consumer Protection     |
| **Consumer Protection Act** (พ.ร.บ. คุ้มครองผู้บริโภค) | ✅ Compliant       | • Fair Contract Terms<br>• Clear Disclosure<br>• Dispute Resolution     |
| **AI Ethics** (EU AI Act, IEEE Standards)              | ✅ Best Practice   | • Explainable AI (XAI)<br>• Bias Auditing<br>• Human-in-the-Loop        |

### 🛡️ Consumer Rights (สิทธิของผู้บริโภค)

1. **สิทธิในการรับทราบข้อมูล** - SHAP Waterfall แสดงปัจจัยทุกตัว
2. **สิทธิในการคัดค้าน** - ระบบ Dispute พร้อม Manual Review
3. **สิทธิในการลบข้อมูล** - Data Deletion Request
4. **สิทธิในการเข้าถึงข้อมูล** - Data Export Function
5. **สิทธิในการแก้ไขข้อมูล** - Correction Request Form

---

## 🚀 Quick Start

```bash
# Start with Docker (Recommended)
docker compose up -d

# Access the application
open http://localhost:3002

# View Legal & Compliance Center
open http://localhost:3002/legal
```

---

## 📊 Complete Feature List

### ✅ LegalTech Features (เน้นกฎหมาย)

- ✅ **Legal & Compliance Center** (`/legal`) - หน้าแสดงการปฏิบัติตามกฎหมายทั้งหมด
- ✅ **Consumer Rights Dashboard** - แสดงสิทธิ 5 ประการตาม PDPA
- ✅ **Audit Trail System** - บันทึกทุกขั้นตอนเพื่อความโปร่งใส
- ✅ **PDPA Consent Modal** - ขอความยินยอมก่อนเก็บข้อมูล
- ✅ **Dispute Resolution** - ระบบร้องเรียนและทบทวนผล
- ✅ **SHA-256 Digital Signature** - สัญญาแบบ tamper-proof
- ✅ **DPO Contact** - ติดต่อเจ้าหน้าที่คุ้มครองข้อมูล

### ✅ AI/Tech Features

- ✅ **Client-Side AI Engine** - ไม่ต้องพึ่ง Backend
- ✅ **XGBoost Credit Scoring** - Algorithm แบบ FinTech
- ✅ **SHAP Explainability** - อธิบายทุกการตัดสินใจ
- ✅ **AI Fairness Audit** - ตรวจสอบ Bias ด้วย AIF360
- ✅ **Technology Stack Page** - แสดงรายละเอียด AI Models
- ✅ **Model Versioning** - ติดตามเวอร์ชันโมเดล

### ✅ UX Features

- ✅ **Demo Instructions** - คำแนะนำการทดสอบชัดเจน
- ✅ **Professional Footer** - Links ครบถ้วน
- ✅ **Regulatory Badges** - แสดงการรับรองมาตรฐาน
- ✅ **Responsive Design** - ใช้งานได้ทุกอุปกรณ์

---

## 📁 Pages Overview

| Page           | URL           | Purpose                             |
| -------------- | ------------- | ----------------------------------- |
| **Home**       | `/`           | Landing page + Demo instructions    |
| **Assessment** | `/assessment` | Credit assessment workflow          |
| **Fairness**   | `/fairness`   | AI Fairness audit (1000 applicants) |
| **Technology** | `/technology` | AI Models & Architecture            |
| **Legal**      | `/legal`      | ⭐ **Legal & Compliance Center**    |

---

## 🔐 Legal Compliance Highlights

### 1. PDPA (Personal Data Protection Act)

```
✓ Consent before data collection
✓ Data minimization principle
✓ User rights (Access, Delete, Correct)
✓ 72-hour breach notification
✓ 7-year audit log retention
```

### 2. BOT (Bank of Thailand) Guidelines

```
✓ Debt-to-income ratio ≤ 50%
✓ No gender/region discrimination
✓ Transparent pricing
✓ Consumer complaint mechanism
```

### 3. Consumer Protection Act

```
✓ Fair contract terms
✓ Full disclosure
✓ Cooling-off period
✓ Dispute resolution process
```

### 4. AI Ethics (EU AI Act)

```
✓ Explainable AI (SHAP)
✓ Bias auditing (AIF360)
✓ Human oversight
✓ Model transparency
```

---

## 💡 Demo Instructions

อัปโหลดไฟล์ชื่อ:

- `food_market_invoice.jpg` → อาหาร (28K/เดือน, ความเสี่ยง 35%)
- `freelance_project.png` → ฟรีแลนซ์ (45K/เดือน, ความเสี่ยง 25%)
- `tech_software.pdf` → IT (55K/เดือน, ความเสี่ยง 20%)

ระบบจะ:

1. วิเคราะห์ชื่อไฟล์ (Smart Categorization)
2. สร้างธุรกรรมจำลอง (Mock Transactions)
3. คำนวณคะแนนเครดิต (Equi-Score™ Algorithm)
4. แสดง SHAP Waterfall (Factor Contributions)
5. สร้างสัญญาพร้อม SHA-256 Hash

---

## 📞 Contact

**Data Protection Officer (DPO)**

- Email: dpo@equi.co.th
- Response: 30 days (PDPA requirement)

**Built for LegalTech Competition 2026**  
**System Version:** v1.2.0-enterprise
