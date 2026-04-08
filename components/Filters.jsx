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

    console.log(filtered);
  };
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
      {/* Filters */}

      <div className="flex gap-4">
        {/* Status select */}
        <div>
          <p className="text-[#434655]  text-[10px] font-bold leading-3.75 uppercase mb-1">
            Status
          </p>
          <div className="relative inline-block">
            <select
              onChange={(e) => handleChange({ status: e.target.value })}
              className="appearance-none pr-10 pl-3 py-2  rounded bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value={'all'}>Barchasi</option>
              <option value={'normal'}>Normal</option>
              <option value={'warning'}>Warning</option>
              <option value={'critical'}>Critical</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <DropDownIcon />
            </div>
          </div>
        </div>

        {/* Type select */}
        <div>
          <p className="text-[#434655]  text-[10px] font-bold leading-3.75 uppercase mb-1">Turi</p>
          <div className="relative inline-block">
            <select
              className="appearance-none pr-10 pl-3 py-2   rounded bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) => handleChange({ type: e.target.value })}
            >
              <option value={'all'}>Barchasi</option>
              <option>Stansiya</option>
              <option>Quduq</option>
              <option>Nasos</option>
              <option>Klapan</option>
            </select>

            {/* Custom icon */}
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <DropDownIcon />
            </div>
          </div>
        </div>
      </div>

      {/* View toggle */}
      <div className="flex gap-2">
        <button
          className={`text-[#434655] text-center text-[14px] font-medium flex items-center gap-1 px-3 py-2  bg-white rounded hover:bg-gray-50  border-gray-300 
            ${filtered.content === 'card' ? 'text-blue-600 text-[14px] ' : ''}`}
          onClick={() => setFiltered({ ...filtered, content: 'card' })}
        >
          <BsGrid />
          Kartalar
        </button>

        <button
          className={`text-[#434655] text-center text-[14px] font-medium flex items-center gap-1 px-3 py-2  bg-white rounded hover:bg-gray-50  border-gray-300 
            ${filtered.content === 'table' ? 'text-blue-600 text-[14px] ' : ''}`}
          onClick={() => setFiltered({ ...filtered, content: 'table' })}
        >
          <MdOutlineTableRows />
          Jadval
        </button>
      </div>
    </div>
  );
};

export default Filters;
