import React from 'react';
import { MdOutlineTableRows } from 'react-icons/md';
import { BsGrid } from 'react-icons/bs';

const DropDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
    <path
      d="M6.29999 8.39999L10.5 12.6L14.7 8.39999"
      stroke="#6B7280"
      strokeWidth="1.575"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Filters = ({ setFiltered, filtered }) => {
  const handleChange = (value) => {
    console.log(value);

    setFiltered({ ...filtered, ...value });
  };
  return (
    <div className="flex flex-wrap flex-col sm:flex-row sm:items-center justify-between bg-gray-100 p-3 sm:p-4 rounded-lg gap-3">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-end">
        {/* search */}
        <div>
          <p className="text-[#434655] text-[10px] font-bold leading-3.75 uppercase mb-1">
            Qidirish
          </p>
          <input
            placeholder="Qidirish..."
            value={filtered.search}
            type="search"
            onChange={(e) => setFiltered({ ...filtered, search: e.target.value })}
            className="w-full sm:w-auto pr-2 pl-3 py-2 rounded bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        {/* Filters */}
        <div className="flex gap-3 sm:gap-4">
          {/* Status select */}
          <div className="flex-1 sm:flex-none">
            <p className="text-[#434655] text-[10px] font-bold leading-3.75 uppercase mb-1">
              Status
            </p>
            <div className="relative">
              <select
                onChange={(e) => handleChange({ status: e.target.value })}
                className="w-full appearance-none pr-10 pl-3 py-2 rounded bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value={'all'}>Barchasi</option>
                <option value={'normal'}>Normal</option>
                <option value={'warning'}>Warning</option>
                <option value={'critical'}>Critical</option>
                <option value={'offline'}>Offline</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <DropDownIcon />
              </div>
            </div>
          </div>

          {/* Type select */}
          <div className="flex-1 sm:flex-none">
            <p className="text-[#434655] text-[10px] font-bold leading-3.75 uppercase mb-1">
              Turi
            </p>
            <div className="relative">
              <select
                className="w-full appearance-none pr-10 pl-3 py-2 rounded bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => handleChange({ type: e.target.value })}
              >
                <option value={'all'}>Barchasi</option>
                <option>Stansiya</option>
                <option>Quduq</option>
                <option>Nasos</option>
                <option>Klapan</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <DropDownIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View toggle */}
      <div className="flex  gap-2 self-end sm:self-auto">
        <button
          className={`text-[#434655] text-center text-[14px] font-medium flex items-center gap-1 px-3 py-2 bg-white rounded hover:bg-gray-50 border-gray-300 
            ${filtered.content === 'card' ? 'text-blue-600' : ''}`}
          onClick={() => setFiltered({ ...filtered, content: 'card' })}
        >
          <BsGrid />
          <span className="hidden sm:inline">Kartalar</span>
        </button>

        <button
          className={`text-[#434655] text-center text-[14px] font-medium flex items-center gap-1 px-3 py-2 bg-white rounded hover:bg-gray-50 border-gray-300 
            ${filtered.content === 'table' ? 'text-blue-600' : ''}`}
          onClick={() => setFiltered({ ...filtered, content: 'table' })}
        >
          <MdOutlineTableRows />
          <span className="hidden sm:inline">Jadval</span>
        </button>
      </div>
    </div>
  );
};

export default Filters;
