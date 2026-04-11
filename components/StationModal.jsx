'use client';
import { useEffect, useRef } from 'react';
import {
  FaTimes,
  FaCircle,
  FaWrench,
  FaHistory,
  FaThermometerHalf,
  FaTachometerAlt,
  FaUser,
} from 'react-icons/fa';
import { FaWaveSquare } from 'react-icons/fa6';

// --- Status config ---
const statusConfig = {
  normal: {
    label: 'Normal',
    color: '#006229',
    bg: 'rgba(0,126,55,0.10)',
    border: 'rgba(0,98,41,0.20)',
    dot: '#006229',
  },
  warning: {
    label: 'Ogohlantirish',
    color: '#C2410C',
    bg: '#FFEDD5',
    border: '#FED7AA',
    dot: '#F97316',
  },
  critical: {
    label: 'Kritik',
    color: '#BA1A1A',
    bg: '#FEE2E2',
    border: '#FECACA',
    dot: '#BA1A1A',
  },
  offline: {
    label: 'Offline',
    color: '#374151',
    bg: '#F3F4F6',
    border: '#D1D5DB',
    dot: '#6B7280',
  },
};

// --- SVG Pressure Gauge ---
function PressureGauge({ value, max = 15, status }) {
  const pct = Math.min(value / max, 1);
  const angle = -220 + pct * 260; // starts at -220deg, sweeps 260deg
  const r = 52;
  const cx = 70;
  const cy = 70;
  const startAngle = -220 * (Math.PI / 180);
  const endAngle = (angle) * (Math.PI / 180);

  const describeArc = (startDeg, endDeg, radius) => {
    const start = {
      x: cx + radius * Math.cos((startDeg * Math.PI) / 180),
      y: cy + radius * Math.sin((startDeg * Math.PI) / 180),
    };
    const end = {
      x: cx + radius * Math.cos((endDeg * Math.PI) / 180),
      y: cy + radius * Math.sin((endDeg * Math.PI) / 180),
    };
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  const needleAngle = -220 + pct * 260;
  const needleRad = (needleAngle * Math.PI) / 180;
  const needleLen = 42;
  const nx = cx + needleLen * Math.cos(needleRad);
  const ny = cy + needleLen * Math.sin(needleRad);

  const activeColor = statusConfig[status]?.color || '#BA1A1A';

  return (
    <svg viewBox="0 0 140 100" className="w-full max-w-[140px] mx-auto">
      {/* Background arc */}
      <path
        d={describeArc(-220, 40, r)}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* Active arc */}
      <path
        d={describeArc(-220, needleAngle, r)}
        fill="none"
        stroke={activeColor}
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* Needle */}
      <line
        x1={cx}
        y1={cy}
        x2={nx}
        y2={ny}
        stroke={activeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r="4.5" fill={activeColor} />
      {/* Value text */}
      <text
        x={cx}
        y={cy + 22}
        textAnchor="middle"
        fontSize="18"
        fontWeight="900"
        fill="#191C1E"
        fontFamily="Inter, sans-serif"
      >
        {value}
      </text>
      <text
        x={cx}
        y={cy + 34}
        textAnchor="middle"
        fontSize="8"
        fill="#6B7280"
        fontFamily="Inter, sans-serif"
      >
        bar
      </text>
    </svg>
  );
}

// --- Mini sparkline ---
function Sparkline({ color = '#93C5FD' }) {
  const points = [
    [0, 30], [15, 22], [30, 28], [45, 18], [60, 24], [75, 16], [90, 20],
    [105, 14], [120, 18], [135, 12], [150, 16],
  ];
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  return (
    <svg viewBox="0 0 150 40" className="w-full h-8 mt-2" preserveAspectRatio="none">
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// --- Status history mock data ---
const mockHistory = (status) => [
  {
    time: '14:30',
    title: status === 'critical' ? "Kritik: Harorat oshishi" : status === 'warning' ? "Ogohlantirish: Bosim oshishi" : "Normal holat",
    desc: status === 'critical' ? "Sensor 92°C haroratni qayd etdi. Avtomatik sovitish yoqildi." : status === 'warning' ? "Bosim belgilangan chegaradan oshdi." : "Tizim barqaror ishlamoqda.",
    type: status === 'critical' ? 'critical' : status === 'warning' ? 'warning' : 'normal',
  },
  {
    time: '13:12',
    title: "Bosim o'zgarishi",
    desc: "Bosim 8.1 bar dan 8.7 bar ga ko'tarildi.",
    type: 'warning',
  },
  {
    time: '11:00',
    title: "Normal holat",
    desc: "Tizim barqaror ishlamoqda.",
    type: 'normal',
  },
  { time: '09:15', title: "Operator kirishi", desc: null, type: 'default' },
  { time: '08:00', title: "Kunlik test boshlandi", desc: null, type: 'default' },
];

const historyDotColor = {
  critical: '#BA1A1A',
  warning: '#F97316',
  normal: '#006229',
  default: '#CBD5E1',
};
const historyTitleColor = {
  critical: '#BA1A1A',
  warning: '#C2410C',
  normal: '#006229',
  default: '#191C1E',
};

export default function StationModal({ item, onClose }) {
  const overlayRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!item) return null;

  const cfg = statusConfig[item.status] || statusConfig.normal;
  const history = mockHistory(item.status);
  const tempColor = item.parameters.temperature > 80 ? '#BA1A1A'
    : item.parameters.temperature > 60 ? '#F97316' : '#191C1E';

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full overflow-hidden"
        style={{ maxWidth: '860px', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* ── HEADER ── */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between border-b border-gray-100">
          <div>
            <h2 className="text-[22px] font-black text-[#191C1E] leading-tight mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              {item.name}
            </h2>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EEF2FF] text-[#4338CA] border border-[#C7D2FE]">
                {item.type?.toUpperCase()}
              </span>
              <span
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border"
                style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.border }}
              >
                <FaCircle size={6} style={{ color: cfg.dot }} />
                {cfg.label.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1.5 text-[13px] font-medium text-[#006229]">
              <FaCircle size={7} className="text-[#006229] animate-pulse" />
              Jonli uzatish
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition text-gray-500"
            >
              <FaTimes size={14} />
            </button>
          </div>
        </div>

        {/* ── PARAMETER CARDS ── */}
        <div className="grid grid-cols-3 gap-3 px-6 py-4">
          {/* BOSIM */}
          <div className="bg-[#F8F9FB] rounded-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-[#6B7280] tracking-widest uppercase">Bosim</span>
              <div className="w-6 h-6 rounded-full bg-[#004AC6] flex items-center justify-center">
                <FaTachometerAlt size={10} className="text-white" />
              </div>
            </div>
            <PressureGauge value={item.parameters.pressure} status={item.status} />
            <Sparkline color="#93C5FD" />
          </div>

          {/* OQIM TEZLIGI */}
          <div className="bg-[#F8F9FB] rounded-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-[#6B7280] tracking-widest uppercase">Oqim tezligi</span>
              <FaWaveSquare size={16} className="text-blue-400" />
            </div>
            <p className="text-[28px] font-black text-[#191C1E] leading-none" style={{ fontFamily: 'Inter, sans-serif' }}>
              {Math.round(item.parameters.flow)}
              <span className="text-[13px] font-semibold text-gray-500 ml-1">m³/soat</span>
            </p>
            <div className="mt-3 mb-1">
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-2 bg-blue-500 rounded-full transition-all"
                  style={{ width: `${Math.min((item.parameters.flow / 200) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-gray-400">0 M³</span>
                <span className="text-[9px] text-gray-400">200 M³ MAX</span>
              </div>
            </div>
            <Sparkline color="#93C5FD" />
          </div>

          {/* HARORAT */}
          <div className="bg-[#F8F9FB] rounded-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-[#6B7280] tracking-widest uppercase">Harorat</span>
              <FaThermometerHalf size={16} style={{ color: tempColor }} />
            </div>
            <p className="text-[32px] font-black leading-none" style={{ color: tempColor, fontFamily: 'Inter, sans-serif' }}>
              {Math.round(item.parameters.temperature)}°C
            </p>
            {item.parameters.temperature > 80 && (
              <p className="text-[11px] text-[#BA1A1A] mt-1 font-medium">Kritik chegaradan yuqori</p>
            )}
            {item.parameters.temperature > 60 && item.parameters.temperature <= 80 && (
              <p className="text-[11px] text-[#C2410C] mt-1 font-medium">Ogohlantirish chegarasida</p>
            )}
            <Sparkline color={item.parameters.temperature > 80 ? '#FCA5A5' : '#FCD34D'} />
          </div>
        </div>

        {/* ── BOTTOM SECTION ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 px-6 pb-6">
          {/* Obyekt ma'lumotlari */}
          <div className="pr-0 md:pr-6 md:border-r border-gray-100">
            <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#191C1E] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span className="w-1 h-5 bg-[#004AC6] rounded-full" />
              Obyekt ma'lumotlari
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
              <div>
                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Joylashuv</p>
                <p className="text-[13px] font-semibold text-[#191C1E]">{item.location?.region || '—'}</p>
                <p className="text-[11px] text-gray-400">41.3111° N, 69.2797° E</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">O'rnatilgan sana</p>
                <p className="text-[13px] font-semibold text-[#191C1E]">12-Iyul, 2021</p>
                <p className="text-[11px] text-gray-400">Kafolat muddati: 2026 gacha</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Operator</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-7 h-7 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                    <FaUser size={11} className="text-[#4338CA]" />
                  </div>
                  <p className="text-[13px] font-semibold text-[#191C1E]">{item.operator}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Oxirgi texnik xizmat</p>
                <p className="text-[13px] font-semibold text-[#191C1E]">04-Mart, 2024</p>
                <p className="text-[11px] text-[#006229] font-medium flex items-center gap-1">
                  ✓ Muvaffaqiyatli
                </p>
              </div>
            </div>
          </div>

          {/* Holat tarixi */}
          <div className="mt-5 md:mt-0 md:pl-6">
            <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#191C1E] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span className="w-1 h-5 bg-[#004AC6] rounded-full" />
              Holat tarixi
            </h3>
            <div className="space-y-3">
              {history.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center mt-0.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: historyDotColor[h.type] }}
                    />
                    {i < history.length - 1 && (
                      <div className="w-[1px] h-5 bg-gray-200 mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="flex items-baseline justify-between">
                      <p
                        className="text-[13px] font-semibold"
                        style={{ color: historyTitleColor[h.type] }}
                      >
                        {h.title}
                      </p>
                      <span className="text-[11px] text-gray-400 ml-2 flex-shrink-0">{h.time}</span>
                    </div>
                    {h.desc && (
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{h.desc}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FOOTER BUTTONS ── */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-[#374151] bg-[#F3F4F6] hover:bg-[#E5E7EB] transition"
          >
            <FaHistory size={13} />
            To'liq tarix
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white bg-[#004AC6] hover:bg-[#003DA3] transition">
            <FaWrench size={13} />
            Xizmat chaqirish
          </button>
        </div>
      </div>
    </div>
  );
}
