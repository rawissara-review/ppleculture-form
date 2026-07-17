import { useState, useEffect } from 'react';
import logoLockup from '../imports/logo-lockup-orange.png';

interface FormData {
  fullName: string;
  organization: string;
  role: string;
  otherRole: string;
  email: string;
  secondaryContact: string;
}

const roleOptions = [
  { value: 'developer', emoji: '💻', label: 'Developer', subtitle: 'นักพัฒนา' },
  { value: 'publisher', emoji: '🌐', label: 'Publisher', subtitle: 'ผู้จัดจำหน่าย' },
  { value: 'influencer', emoji: '📣', label: 'Influencer', subtitle: 'อินฟลูฯ/สื่อ' },
  { value: 'esports', emoji: '🎮', label: 'Esports', subtitle: 'อีสปอร์ต' },
  { value: 'designer', emoji: '🎨', label: 'Designer', subtitle: 'ดีไซเนอร์' },
  { value: 'general', emoji: '👥', label: 'Gamer', subtitle: 'ผู้เล่น/ผู้สนใจ' },
  { value: 'other', emoji: '💼', label: 'Other', subtitle: 'อื่นๆ' },
];

const API_URL = '/api/register';

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    organization: '',
    role: '',
    otherRole: '',
    email: '',
    secondaryContact: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [remainingSeats, setRemainingSeats] = useState<number>(40);
  const totalSeats = 40;

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (typeof data.remainingSeats === 'number') {
          setRemainingSeats(data.remainingSeats);
        }
      } catch {
        // keep current value on network error
      }
    };

    fetchSeats();
    const interval = setInterval(fetchSeats, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      setIsSubmitted(true);
      // Use server-confirmed count if available, otherwise decrement locally
      if (typeof data.remainingSeats === 'number') {
        setRemainingSeats(data.remainingSeats);
      } else {
        setRemainingSeats(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = ((totalSeats - remainingSeats) / totalSeats) * 100;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">ลงทะเบียนสำเร็จ! 🎉</h1>
          <p className="text-xl text-orange-50">
            ขอบคุณที่ร่วมเป็นส่วนหนึ่งในการขับเคลื่อนอุตสาหกรรมเกมไทย
          </p>
          <div className="bg-white/95 backdrop-blur rounded-3xl p-8 space-y-4 shadow-2xl">
            <p className="text-orange-900 text-lg">
              📧 เราจะส่งบัตรเชิญและรายละเอียดของงานไปยังอีเมลภายใน 1 สัปดาห์
            </p>
            <p className="text-orange-600 text-xl font-bold">{formData.email}</p>
            <p className="text-sm text-orange-700 mt-4">
              หากไม่พบอีเมล กรุณาตรวจสอบในกล่อง Spam/Junk
            </p>
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                fullName: '',
                organization: '',
                role: '',
                otherRole: '',
                email: '',
                secondaryContact: '',
              });
            }}
            className="text-white hover:text-orange-100 underline transition-colors text-lg font-medium"
          >
            ลงทะเบียนคนอื่นต่อ →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <img
            src={logoLockup}
            alt="People's Culture"
            className="h-16 md:h-20 mx-auto mb-6 drop-shadow-2xl"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
            Level Up Thailand's Game Industry
          </h1>
          <p className="text-lg md:text-xl text-orange-50 mb-2 font-medium">
            เวทีเสวนาและรับฟังความคิดเห็นเพื่อขับเคลื่อนอุตสาหกรรมเกมและอีสปอร์ตในไทย
          </p>
        </div>

        {/* Event Details Card */}
        <div className="bg-white/95 backdrop-blur rounded-3xl p-6 md:p-8 mb-8 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-4 text-gray-800">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📅</span>
              <div>
                <p className="text-sm text-orange-600 font-medium">วันที่</p>
                <p className="font-bold text-gray-900">วันเสาร์ที่ 18 กรกฎาคม 2569</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">⏰</span>
              <div>
                <p className="text-sm text-orange-600 font-medium">เวลา</p>
                <p className="font-bold text-gray-900">13.00 - 17.00 น.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:col-span-2">
              <span className="text-3xl">📍</span>
              <div>
                <p className="text-sm text-orange-600 font-medium">สถานที่</p>
                <p className="font-bold text-gray-900">Glowfish สาทร</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gamified Progress Bar */}
        <div className="bg-navy-800 rounded-3xl p-6 mb-8 shadow-2xl" style={{ backgroundColor: '#1e3a8a' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-3">
            <p className="text-base md:text-lg font-bold flex items-center gap-2 text-white">
              <span className="animate-pulse text-2xl">🔥</span>
              โควตาจำกัด: เหลือเพียง <span className="text-yellow-300 text-2xl md:text-3xl font-black mx-1">{remainingSeats}</span> จาก {totalSeats} ที่นั่งสุดท้าย
            </p>
          </div>
          <div className="relative h-4 bg-blue-900 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 rounded-full transition-all duration-700 shadow-lg"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-800">
              ชื่อ - นามสกุล <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900"
              placeholder="กรอกชื่อและนามสกุลของคุณ"
            />
          </div>

          {/* Organization */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-800">
              สังกัด / หน่วยงาน / สถาบัน <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900"
              placeholder="บริษัท, มหาวิทยาลัย, หรือองค์กรของคุณ"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-bold mb-4 text-gray-800">
              บทบาทหลักในวงการเกม <span className="text-orange-600">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {roleOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, role: option.value })}
                  className={`
                    relative p-4 rounded-2xl border-3 transition-all duration-300 text-center
                    ${formData.role === option.value
                      ? 'border-orange-600 bg-orange-50 shadow-lg shadow-orange-500/30 scale-105 border-4'
                      : 'border-gray-300 bg-white hover:border-orange-400 hover:bg-orange-50/50 border-2'
                    }
                  `}
                >
                  {formData.role === option.value && (
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-orange-600 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  <div className="text-4xl mb-2">{option.emoji}</div>
                  <div className="font-bold text-gray-900 text-xs sm:text-sm mb-1">{option.label}</div>
                  <div className="text-xs text-gray-600">{option.subtitle}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Other Role (conditional) */}
          {formData.role === 'other' && (
            <div className="animate-slide-down">
              <label className="block text-sm font-bold mb-2 text-gray-800">
                โปรดระบุตำแหน่งของคุณ <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.otherRole}
                onChange={(e) => setFormData({ ...formData, otherRole: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900"
                placeholder="เช่น นักวิจัย, นักลงทุน, นักศึกษา"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-800">
              อีเมล <span className="text-orange-600">*</span>
              <span className="text-xs text-orange-600 ml-2 font-normal">(สำหรับรับบัตรเชิญและรายละเอียดการเดินทาง)</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Secondary Contact */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-800">
              ช่องทางติดต่ออื่นๆ <span className="text-gray-500 text-xs font-normal">(ไม่บังคับ)</span>
            </label>
            <input
              type="text"
              value={formData.secondaryContact}
              onChange={(e) => setFormData({ ...formData, secondaryContact: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900"
              placeholder="เบอร์โทรศัพท์ หรือ Line ID"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !formData.role}
            className="w-full py-4 rounded-2xl font-bold text-xl text-white
              hover:shadow-2xl hover:scale-[1.02]
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              transition-all duration-300 relative overflow-hidden group shadow-xl"
            style={{ backgroundColor: '#1e3a8a' }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? 'กำลังบันทึกข้อมูล...' : (
                <>
                  <span>ยืนยันการลงทะเบียน</span>
                  <span className="text-2xl">🚀</span>
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>

          <p className="text-center text-sm text-gray-600">
            การลงทะเบียนแสดงว่าคุณยินยอมให้เราติดต่อกลับทางอีเมลที่ให้ไว้
          </p>
        </form>
      </div>
    </div>
  );
}
