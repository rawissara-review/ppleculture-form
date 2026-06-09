# 🔧 แก้ปัญหาจอขาวบน Vercel

## ปัญหา: เว็บเป็นจอขาว (Blank White Screen)

### วิธีแก้ทันที:

#### 1. ตรวจสอบ Build Logs บน Vercel

1. ไปที่ Vercel Dashboard → เลือก Project
2. คลิก "Deployments"
3. คลิกที่ deployment ล่าสุด
4. คลิก "Building" เพื่อดู build logs
5. ดูว่ามี error อะไรหรือไม่

#### 2. ตรวจสอบ Runtime Logs

1. ใน Vercel Dashboard → คลิก "Functions"
2. คลิก "Logs"
3. ดูว่ามี error ตอน runtime หรือไม่

#### 3. เปิด Browser Console

1. กด F12 หรือ Right-click → Inspect
2. ไปที่ Tab "Console"
3. Refresh หน้าเว็บ (Ctrl + Shift + R)
4. ดู error messages

---

## สาเหตุที่พบบ่อย:

### ❌ ปัญหา 1: React/React-DOM ไม่ถูก Install

**อาการ**: Build สำเร็จแต่จอขาว, Console แสดง "React is not defined"

**วิธีแก้**:
```bash
# ตรวจสอบว่า package.json มี react และ react-dom ใน dependencies
cat package.json | grep react

# ถ้าไม่มี ให้เพิ่มเข้าไป
pnpm add react@18.3.1 react-dom@18.3.1
```

✅ **แก้แล้ว**: ไฟล์ package.json ได้เพิ่ม React แล้ว

---

### ❌ ปัญหา 2: Path ของ main.tsx ไม่ถูกต้อง

**อาการ**: 404 error ใน Console สำหรับ /src/main.tsx

**วิธีแก้**:
```bash
# ตรวจสอบว่ามีไฟล์นี้
ls -la src/main.tsx

# ตรวจสอบว่า index.html ชี้ถูกที่
grep "main.tsx" index.html
```

✅ **แก้แล้ว**: มีไฟล์ src/main.tsx แล้ว

---

### ❌ ปัญหา 3: TypeScript Config ไม่มี

**อาการ**: Build fail ด้วย TypeScript errors

**วิธีแก้**:
```bash
# ตรวจสอบว่ามี tsconfig.json
ls -la tsconfig*.json
```

✅ **แก้แล้ว**: สร้าง tsconfig.json และ tsconfig.node.json แล้ว

---

### ❌ ปัญหา 4: CSS ไม่โหลด

**อาการ**: หน้าเว็บมีเนื้อหาแต่ไม่มีสี/style

**วิธีแก้**:
```typescript
// ตรวจสอบว่า main.tsx import CSS ถูกต้อง
import './styles/fonts.css';
import './styles/theme.css';
```

✅ **แก้แล้ว**: main.tsx import CSS ครบแล้ว

---

### ❌ ปัญหา 5: Image Import ผิด

**อาการ**: รูปภาพไม่โชว์, Console มี 404 errors

**วิธีแก้**:
ตรวจสอบว่า import รูปถูกต้อง:

```typescript
// ✅ ถูก
import logo from '../imports/logo.png';

// ❌ ผิด
const logo = '../imports/logo.png';
```

---

## ขั้นตอนการแก้ไข (Step-by-Step)

### Step 1: Re-deploy บน Vercel

```bash
# Push ไฟล์ที่แก้ใหม่ขึ้น GitHub
git add .
git commit -m "Fix: Add React deps and TypeScript config"
git push origin main
```

Vercel จะ auto-deploy ภายใน 1-2 นาที

### Step 2: ทดสอบ Local ก่อน

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Preview production build
pnpm preview
```

ถ้า local ทำงานได้ → Vercel ก็ควรทำงานได้

### Step 3: ลบ Cache บน Vercel

1. ไปที่ Vercel Dashboard → Settings
2. เลื่อนไปหา "Build & Development Settings"
3. คลิก "Redeploy" → เลือก "Use existing Build Cache" **ให้ปิด**
4. คลิก "Redeploy"

---

## Configuration Files ที่จำเป็น ✅

ตรวจสอบว่ามีไฟล์เหล่านี้:

- ✅ `package.json` - มี react, react-dom ใน dependencies
- ✅ `tsconfig.json` - TypeScript config
- ✅ `tsconfig.node.json` - Node TypeScript config  
- ✅ `vite.config.ts` - Vite config
- ✅ `vercel.json` - Vercel config
- ✅ `index.html` - HTML entry point
- ✅ `src/main.tsx` - React entry point
- ✅ `src/app/App.tsx` - Main component

---

## ทดสอบว่าไฟล์ครบหรือไม่

```bash
# ตรวจสอบไฟล์สำคัญ
ls -la package.json tsconfig.json index.html
ls -la src/main.tsx src/app/App.tsx
ls -la vite.config.ts vercel.json
```

---

## Quick Fix Checklist

- [ ] `package.json` มี `react` และ `react-dom` ใน dependencies
- [ ] มีไฟล์ `tsconfig.json` และ `tsconfig.node.json`
- [ ] มีไฟล์ `index.html` ใน root
- [ ] มีไฟล์ `src/main.tsx`
- [ ] `vercel.json` มี outputDirectory = "dist"
- [ ] Re-deploy บน Vercel
- [ ] Clear browser cache (Ctrl + Shift + R)
- [ ] ตรวจสอบ Console ใน Browser (F12)

---

## ยังไม่ได้?

ลองทำตามนี้:

### Option A: ลบ .vercel และ Deploy ใหม่

```bash
# ลบ folder .vercel
rm -rf .vercel

# Deploy ใหม่
vercel --prod
```

### Option B: ใช้ Vercel Dashboard แทน CLI

1. ไปที่ [vercel.com](https://vercel.com)
2. ลบ Project เดิม
3. สร้าง Project ใหม่
4. Import จาก GitHub อีกครั้ง

### Option C: ตรวจสอบ Build Settings

ใน Vercel Dashboard → Settings → Build & Development Settings:

- **Framework Preset**: Vite
- **Build Command**: `pnpm build`
- **Output Directory**: `dist`
- **Install Command**: `pnpm install`
- **Node Version**: 18.x หรือ 20.x

---

## ติดต่อขอความช่วยเหลือ

หากยังไม่ได้ ให้ส่งข้อมูลนี้:

1. Screenshot ของ Build Logs บน Vercel
2. Screenshot ของ Browser Console (F12)
3. Screenshot ของ Vercel Settings
4. Link ไปยัง GitHub repository

---

**อัปเดตล่าสุด**: ได้แก้ไขไฟล์ทั้งหมดแล้ว ตอนนี้ควรจะ deploy ได้โดยไม่มีปัญหา 🎉
