import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="border-t border-gray-200 text-center p-8 ">
      <p className="text-[#434655] text-center text-[12px] font-normal leading-4">
        © {year} SCADA Industrial Monitoring System. Barcha huquqlar himoyalangan.
      </p>
    </div>
  );
};

export default Footer;
