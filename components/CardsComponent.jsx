'use client';
import { FaArrowRight } from 'react-icons/fa';

const data = [
  {
    name: 'Stansiya A-01',
    type: 'Stansiya',
    status: 'warning',
    location: { region: 'Toshkent viloyati' },
    operator: 'Karimov Jasur',
    installedAt: '2019-03-15',
    lastMaintenance: '2025-01-10',
    parameters: { pressure: 8.55, flow: 176.76, temperature: 90.4 },
  },
  {
    name: 'Stansiya A-07',
    type: 'Nasos',
    status: 'normal',
    location: { region: 'Toshkent viloyati' },
    operator: 'Rahimov Bobur',
    installedAt: '2020-06-20',
    lastMaintenance: '2024-11-05',
    parameters: { pressure: 5.2, flow: 144.23, temperature: 61.84 },
  },
  {
    name: 'Quduq B-03',
    type: 'Quduq',
    status: 'normal',
    location: { region: 'Samarqand viloyati' },
    operator: 'Toshmatov Dilshod',
    installedAt: '2018-09-10',
    lastMaintenance: '2024-08-22',
    parameters: { pressure: 2.63, flow: 103.08, temperature: 68.94 },
  },
  {
    name: 'Nasos N-12',
    type: 'Nasos',
    status: 'normal',
    location: { region: "Farg'ona viloyati" },
    operator: 'Yusupov Anvar',
    installedAt: '2021-01-05',
    lastMaintenance: '2025-02-14',
    parameters: { pressure: 3.99, flow: 146.75, temperature: 66.79 },
  },
  {
    name: 'Klapan K-05',
    type: 'Klapan',
    status: 'offline',
    location: { region: 'Buxoro viloyati' },
    operator: 'Mirzayev Sherzod',
    installedAt: '2017-12-01',
    lastMaintenance: '2024-06-30',
    parameters: { pressure: 1, flow: 20, temperature: 30 },
  },
  {
    name: 'Quduq B-08',
    type: 'Quduq',
    status: 'normal',
    location: { region: 'Namangan viloyati' },
    operator: 'Hasanov Timur',
    installedAt: '2022-04-18',
    lastMaintenance: '2025-03-01',
    parameters: { pressure: 3.19, flow: 138.2, temperature: 68.35 },
  },
  {
    name: 'Stansiya C-02',
    type: 'Stansiya',
    status: 'normal',
    location: { region: 'Andijon viloyati' },
    operator: 'Nazarov Sardor',
    installedAt: '2020-11-30',
    lastMaintenance: '2024-12-15',
    parameters: { pressure: 2.47, flow: 92.12, temperature: 70.1 },
  },
  {
    name: 'Klapan K-11',
    type: 'Klapan',
    status: 'critical',
    location: { region: 'Qashqadaryo viloyati' },
    operator: 'Ergashev Mansur',
    installedAt: '2023-02-10',
    lastMaintenance: '2025-01-25',
    parameters: { pressure: 9.49, flow: 191.69, temperature: 113.5 },
  },
];

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

export default function CardsComponent() {
  return (
    <div className="w-full ">
      <div className="w-full flex items-start justify-between gap-8 flex-wrap">
        {data.map((item, index) => (
          <div
            key={index}
            className="w-75 pt-6 overflow-hidden hover:shadow-md transition rounded-2xl border border-[rgba(195,198,215,0.10)] bg-white shadow-sm "
          >
            {/* header */}
            <div className="px-6 flex items-center justify-between mb-3">
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
              <span>{item.message || 'bosim kritik darajaga yetdi'}</span>

              <button
                className={` text-center text-[12px]  font-bold leading-4 tracking-[1.2px] uppercase px-3 py-1 rounded-md ${btnStyle[item.status]}`}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
