# 🎮 Game Industry Event Registration Form

แบบฟอร์มลงทะเบียนสำหรับเวทีเสวนาและรับฟังความคิดเห็นเพื่อขับเคลื่อนอุตสาหกรรมเกมและอีสปอร์ตในไทย

## 🌟 Features

- ✨ Gamified UI with progress bar showing remaining seats
- 🎨 Beautiful orange theme matching People's Culture branding
- 📱 Fully responsive (mobile, tablet, desktop)
- 🚀 Built with React + TypeScript + Tailwind CSS v4
- 📊 Google Sheets integration ready
- 📧 Resend email confirmation support

## 🛠️ Tech Stack

- **Frontend**: React 18.3, TypeScript
- **Styling**: Tailwind CSS 4.x, Kanit Font
- **Build Tool**: Vite 6.x
- **Package Manager**: pnpm
- **Backend**: Google Apps Script + Google Sheets
- **Email**: Resend API (optional)

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite settings
6. Click "Deploy"

### Option 3: Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_GITHUB_REPO_URL)

## 🔧 Google Sheets Setup

1. Follow the detailed instructions in `GOOGLE_SHEETS_SETUP.md`
2. Copy the Google Apps Script code from `google-apps-script.txt`
3. Update the script URL in `src/app/App.tsx` (line ~39)

### Quick Setup:

1. Create a Google Sheet with these columns:
   - Timestamp
   - Full Name (ชื่อ-นามสกุล)
   - Organization (สังกัด)
   - Role (บทบาท)
   - Email (อีเมล)
   - Secondary Contact (ติดต่ออื่นๆ)

2. Go to Extensions > Apps Script
3. Paste code from `google-apps-script.txt`
4. Deploy as Web App
5. Copy the URL and update `src/app/App.tsx`

## 📧 Email Integration (Optional)

The Google Apps Script includes Resend integration for confirmation emails:

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Update the `RESEND_API_KEY` in the Google Apps Script
4. Uncomment the email function call

## 🎨 Customization

### Change Event Details

Edit in `src/app/App.tsx`:
- Event date, time, venue (around line 100-120)
- Total seats count (line 23)
- Form fields

### Change Colors

The design uses:
- Primary: Orange (#f97316 - #ea580c)
- Accent: Navy Blue (#1e3a8a)
- Background: Orange gradient

Edit colors in the JSX className attributes.

### Change Font

Currently using **Kanit** font. To change:
1. Edit `src/styles/fonts.css`
2. Update the Google Fonts import URL

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── App.tsx              # Main component
│   │   └── components/          # Reusable components
│   ├── imports/                 # Images and assets
│   └── styles/
│       ├── fonts.css            # Font imports
│       └── theme.css            # Tailwind theme
├── package.json
├── vite.config.ts
├── vercel.json                  # Vercel configuration
├── GOOGLE_SHEETS_SETUP.md       # Backend setup guide
└── google-apps-script.txt       # Google Apps Script code
```

## 🌐 Environment Variables

No environment variables needed for frontend. All configuration is in Google Apps Script.

## 📝 Form Fields

1. **ชื่อ - นามสกุล** (Full Name) - Required
2. **สังกัด / หน่วยงาน / สถาบัน** (Organization) - Required
3. **บทบาทหลักในวงการเกม** (Role) - Required
   - Developer (นักพัฒนา)
   - Publisher (ผู้จัดจำหน่าย)
   - Influencer (อินฟลูฯ/สื่อ)
   - Esports (อีสปอร์ต)
   - Designer (ดีไซเนอร์)
   - Gamer (ผู้เล่น/ผู้สนใจ)
   - Other (อื่นๆ - with custom input)
4. **อีเมล** (Email) - Required
5. **ช่องทางติดต่ออื่นๆ** (Secondary Contact) - Optional

## 🐛 Troubleshooting

### Build fails on Vercel
- Make sure `pnpm-lock.yaml` is committed
- Check that all dependencies are in `package.json`

### Form submission not working
- Verify Google Apps Script URL is correct
- Check CORS settings in Apps Script
- Look at browser console for errors

### Styles not loading
- Clear cache and rebuild
- Check that Tailwind CSS v4 is properly configured

## 📄 License

This project is created for People's Culture (ปักวัฒนธรรมพรรคประชาชน).

## 🙏 Credits

- Design: Based on People's Culture brand guidelines
- Font: Kanit by Cadson Demak
- Icons: Emoji (native)
- Framework: React + Vite + Tailwind CSS

## 📞 Support

For technical issues or questions:
- Check `GOOGLE_SHEETS_SETUP.md` for backend setup
- Review Vercel deployment logs
- Contact the development team

---

Made with ❤️ for Thailand's Game Industry
