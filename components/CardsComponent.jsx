'use client';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
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

  if (data.length == 0) {
    return <h2>Ma'lumot topilmadi</h2>;
  }

  return (
    <div className="w-full ">
      <div className=" cards w-full flex items-start justify-center gap-4 md:gap-8 flex-wrap">
        {data?.map((item, index) => (
          <div
            key={index}
            className="card__item pt-6 overflow-hidden hover:shadow-md transition rounded-2xl border border-[rgba(195,198,215,0.10)] bg-white shadow-sm "
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
                <p className="text-[#434655] font-bold uppercase mb-1">Bosim</p>
                <p
                  className={`text-center text-[18px] font-black leading-7 ${textStyle[item.status]}`}
                >
                  {item.parameters.pressure}
                </p>
                <p className="text-[#434655] text-center text-[10px] font-normal leading-7">bar</p>
              </div>

              <div className="bg-[#F2F4F6] rounded-lg p-3">
                <p className="text-slate-500">Oqim</p>
                <p className="text-[#191C1E] text-center text-[18px] font-black leading-7 ">
                  {Math.round(item.parameters.flow)}
                </p>
                <p className="text-[#434655] text-center text-[10px] font-normal leading-7">m3/s</p>
              </div>

              <div className="bg-[#F2F4F6] rounded-lg p-2">
                <p className="text-slate-500">Harorat</p>
                <p className="text-[#191C1E] text-center text-[18px] font-black leading-7">
                  {Math.round(item.parameters.temperature)}°C
                </p>
                <p></p>
              </div>
            </div>

            {/* footer */}
            <div
              className={`mt-3 py-3 px-6 font-medium text-sm text-black flex justify-between items-center border-t border-[rgba(195,198,215,0.10)]  ${statusStyle[item.status]} rounded-none`}
            >
              <span>{messageData(item) || `Hammasi joyida, Normal xolatda ishlayapti`}</span>

              <button
                onClick={() => setSelectedItem(item)}
                className={` text-center text-[12px]  font-bold leading-4 tracking-[1.2px] uppercase px-3 py-1 rounded-md ${btnStyle[item.status]}`}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <StationModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
