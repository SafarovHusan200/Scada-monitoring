'use client';
import { useState } from 'react';
import { FaArrowRight, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaChevronRight } from 'react-icons/fa';
import CardSkeleton from './CardSkeleton';
import StationModal from './StationModal';
import '../styles/cardStyle.css';

const statusStyle = {
  normal: ' border-[rgba(0,98,41,0.20)] bg-[rgba(0,126,55,0.10)]',
  warning: 'bg-[#FFEDD5] text-yellow-700 border-[#FED7AA]',
  critical: 'bg-red-50 text-red-700 border-red-200',
  offline: 'bg-gray-300  border-gray-300',
};

const roundStyle = {
  normal: 'bg-[#006229]',
  warning: 'bg-[#F97316]',
  critical: 'bg-[#BA1A1A]',
  offline: 'bg-gray-700',
};

const textStyle = {
  normal: ' text-[#191C1E]',
  warning: 'text-[#F97316] ',
  critical: 'text-[#BA1A1A]',
  offline: 'text-gray-700',
};

const btnStyle = {
  normal: ' text-[#004AC6]',
  warning: 'text-[#C2410C] ',
  critical: 'text-[#fff] bg-[#BA1A1A]',
  offline: 'text-gray-700 ',
};

const mobileStatusConfig = {
  normal: { color: '#006229', bg: '#EDF7F1', icon: FaCheckCircle, label: 'NORMAL' },
  warning: { color: '#C2410C', bg: '#FFF7ED', icon: FaExclamationTriangle, label: 'OGOH' },
  critical: { color: '#BA1A1A', bg: '#FEF2F2', icon: FaTimesCircle, label: 'KRITIK' },
  offline: { color: '#374151', bg: '#F3F4F6', icon: FaTimesCircle, label: 'OFFLINE' },
};

export default function CardsComponent({ data, isLoading }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const messageData = (item) => (item.message ? item.message.split(' ').slice(2).join(' ') : '');
  if (isLoading) {
    return (
      <div className="w-full flex gap-8 flex-wrap">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (data?.length == 0) {
    return <h2>Ma'lumot topilmadi</h2>;
  }

  return (
    <div className="w-full">
      <div className="cards w-full flex flex-col sm:grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-6 items-start">
        {data?.map((item, index) => {
          const mStatus = mobileStatusConfig[item.status] || mobileStatusConfig.normal;
          const StatusIcon = mStatus.icon;

          return (
            <div key={index} className="w-full">
              {/* --- Mobile Layout (Horizontal) --- */}
              <div 
                onClick={() => setSelectedItem(item)}
                className="flex sm:hidden items-center justify-between p-3 bg-white rounded-2xl shadow-sm border border-[rgba(195,198,215,0.15)] active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
                    <img 
                      src={`https://api.dicebear.com/7.x/identicon/svg?seed=${item.name}`} 
                      alt={item.name}
                      className="w-12 h-12 object-cover opacity-80"
                    />
                  </div>
                  <div>
                    <h2 className="text-[17px] font-bold text-[#191C1E] leading-tight mb-1">
                      {item.name}
                    </h2>
                    <p className="text-[14px] text-gray-500 font-medium">
                      {item.type}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div 
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider"
                    style={{ backgroundColor: mStatus.bg, color: mStatus.color }}
                  >
                    <StatusIcon size={12} />
                    {mStatus.label}
                  </div>
                  <FaChevronRight size={14} className="text-gray-300" />
                </div>
              </div>

              {/* --- Desktop Layout (Vertical Card) --- */}
              <div
                className="hidden sm:block card__item pt-6 overflow-hidden hover:shadow-md transition rounded-2xl border border-[rgba(195,198,215,0.10)] bg-white shadow-sm h-full"
              >
                {/* header */}
                <div className=" px-6 flex items-center justify-between mb-3">
                  <h2 className="text-[#191C1E] font-[Inter] text-[20px] font-bold leading-7 ">
                    {item.name}
                  </h2>

                  <div
                    className={` flex  items-center gap-2 px-2 py-1 text-[13px] font-semibold rounded-xl border ${statusStyle[item.status]}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${roundStyle[item.status]}`}></span>
                    {item.status}
                  </div>
                </div>

                {/* info */}
                <div className="px-6 text-sm text-[#434655] space-y-1 mb-7">
                  <div className="flex justify-between">
                    <p>{item.type}</p>
                    <p>{item.location.region}</p>
                  </div>
                  <p>Operator: {item.operator}</p>
                </div>

                {/* parameters */}
                <div className=" px-6 grid grid-cols-3 gap-2 text-center text-sm mb-6">
                  <div className="bg-[#F2F4F6] rounded-lg p-2">
                    <p className="text-[#434655] font-bold uppercase mb-1 text-[10px]">Bosim</p>
                    <p
                      className={`text-center text-[18px] font-black leading-7 ${textStyle[item.status]}`}
                    >
                      {item.parameters.pressure}
                    </p>
                    <p className="text-[#434655] text-center text-[10px] font-normal leading-7">bar</p>
                  </div>

                  <div className="bg-[#F2F4F6] rounded-lg p-3">
                    <p className="text-slate-500 text-[10px] font-bold uppercase mb-1">Oqim</p>
                    <p className="text-[#191C1E] text-center text-[18px] font-black leading-7 ">
                      {Math.round(item.parameters.flow)}
                    </p>
                    <p className="text-[#434655] text-center text-[10px] font-normal leading-7">m3/s</p>
                  </div>

                  <div className="bg-[#F2F4F6] rounded-lg p-2">
                    <p className="text-slate-500 text-[10px] font-bold uppercase mb-1">Harorat</p>
                    <p className="text-[#191C1E] text-center text-[18px] font-black leading-7">
                      {Math.round(item.parameters.temperature)}°C
                    </p>
                    <p></p>
                  </div>
                </div>

                {/* footer */}
                <div
                  className={`mt-3 py-4 px-6 font-medium text-sm text-black flex justify-between items-center border-t border-[rgba(195,198,215,0.10)]  ${statusStyle[item.status]} rounded-none`}
                >
                  <span className="text-[12px] opacity-80">{messageData(item) || `Hammasi joyida, Normal xolatda ishlayapti`}</span>

                  <button
                    onClick={() => setSelectedItem(item)}
                    className={` text-center text-[12px]  font-bold leading-4 tracking-[1.2px] uppercase px-3 py-1 rounded-md ${btnStyle[item.status]}`}
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedItem && (
        <StationModal id={selectedItem.id} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
