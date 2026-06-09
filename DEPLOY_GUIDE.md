# 🚀 คู่มือ Deploy ไป Vercel

## ขั้นตอนที่ 1: เตรียมโค้ดสำหรับ GitHub

### 1.1 สร้าง Git Repository (ถ้ายังไม่มี)

```bash
git init
git add .
git commit -m "Initial commit: Game Industry Registration Form"
```

### 1.2 สร้าง Repository บน GitHub

1. ไปที่ [github.com](https://github.com)
2. คลิก "New repository"
3. ตั้งชื่อ เช่น "game-industry-registration"
4. เลือก Public หรือ Private
5. **ไม่ต้อง** เลือก "Initialize with README" (เราทำแล้ว)
6. คลิก "Create repository"

### 1.3 Push โค้ดขึ้น GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## ขั้นตอนที่ 2: Deploy ไป Vercel

### วิธีที่ 1: ผ่าน Vercel Dashboard (แนะนำ ⭐)

1. ไปที่ [vercel.com](https://vercel.com)
2. คลิก "Sign Up" หรือ "Log in" (ใช้ GitHub account)
3. คลิก "Add New..." → "Project"
4. เลือก Repository ที่เพิ่งสร้าง
5. Vercel จะตรวจจับการตั้งค่าอัตโนมัติ:
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`
6. คลิก "Deploy"
7. รอ 2-3 นาที ✅ เสร็จสิ้น!

### วิธีที่ 2: ผ่าน Vercel CLI

```bash
# ติดตั้ง Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# หรือ Deploy แบบ Production
vercel --prod
```

---

## ขั้นตอนที่ 3: ตั้งค่า Google Sheets (สำคัญ!)

หลังจาก Deploy แล้ว คุณต้องเชื่อม Google Sheets:

1. ทำตามคำแนะนำใน `GOOGLE_SHEETS_SETUP.md`
2. Copy Google Apps Script Web App URL
3. แก้ไขไฟล์ `src/app/App.tsx` บรรทัด ~39:

```typescript
const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```

เปลี่ยนเป็น:

```typescript
const scriptURL = 'https://script.google.com/macros/s/YOUR_ID/exec';
```

4. Uncomment โค้ด fetch (บรรทัด ~45-48)
5. Commit และ Push ใหม่:

```bash
git add .
git commit -m "Add Google Sheets integration"
git push
```

6. Vercel จะ auto-deploy ใหม่ภายใน 1-2 นาที

---

## ✅ เช็คลิสต์ก่อน Deploy

- [ ] มี `.gitignore` แล้ว
- [ ] มี `README.md` แล้ว
- [ ] มี `vercel.json` แล้ว
- [ ] มี `index.html` แล้ว
- [ ] มี `src/main.tsx` แล้ว
- [ ] ลบ `node_modules/` ออก (ใช้ .gitignore)
- [ ] Test ว่าโค้ดทำงานใน local ได้

---

## 🔧 การตั้งค่าเพิ่มเติม

### Custom Domain (ใช้โดเมนของคุณเอง)

1. ไปที่ Vercel Dashboard → Project Settings
2. เลือก "Domains"
3. เพิ่มโดเมนของคุณ เช่น `register.peoplesculture.or.th`
4. ตั้งค่า DNS ตามคำแนะนำ

### Environment Variables

ถ้าต้องการเก็บ API Key ใน Vercel:

1. ไปที่ Project Settings → Environment Variables
2. เพิ่ม Key-Value
3. Redeploy

---

## 📱 ทดสอบหลัง Deploy

1. เปิด URL ที่ Vercel ให้มา เช่น `your-project.vercel.app`
2. ทดสอบกรอกฟอร์ม
3. ตรวจสอบ Google Sheets ว่ามีข้อมูลเข้ามา
4. ทดสอบบนมือถือ

---

## 🐛 แก้ปัญหา

### Build Failed บน Vercel

**ปัญหา**: `Error: Cannot find module 'react'`

**วิธีแก้**:
- ตรวจสอบว่า `pnpm-lock.yaml` ถูก commit แล้ว
- ลอง redeploy อีกครั้ง

### ฟอร์มส่งไม่ได้

**ปัญหา**: คลิกปุ่มแล้วไม่มีอะไรเกิดขึ้น

**วิธีแก้**:
1. เปิด Browser Console (F12)
2. ดู error message
3. ตรวจสอบ Google Apps Script URL
4. ตรวจสอบ CORS settings

### Styles ไม่แสดงผล

**ปัญหา**: หน้าเว็บดูแปลก ๆ ไม่มีสี

**วิทีแก้**:
- Clear cache: Ctrl + Shift + R
- ตรวจสอบว่า Tailwind CSS import อยู่ใน main.tsx

---

## 🎉 เสร็จสิ้น!

หลังจาก deploy สำเร็จ คุณจะได้:

- ✅ URL สาธารณะที่ใช้ได้ทันที
- ✅ Auto-deploy ทุกครั้งที่ push ไป GitHub
- ✅ HTTPS ฟรี
- ✅ CDN ทั่วโลก (เร็วมาก)
- ✅ Analytics ฟรี

---

## 📞 ต้องการความช่วยเหลือ?

- Documentation: [vercel.com/docs](https://vercel.com/docs)
- Support: [vercel.com/support](https://vercel.com/support)
- Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

**ขอให้ Deploy สำเร็จ! 🚀**
