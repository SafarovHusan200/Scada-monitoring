'use client';

import Link from 'next/link';
import React, { useMemo } from 'react';
import { MdDashboard } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaRegMap, FaChartBar } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

import '../../styles/dashboard/style.css';

const menuItems = [
  {
    label: 'Asosiy',
    href: '/dashboard',
    icon: MdDashboard,
    key: '',
  },
  {
    label: 'Xarita',
    href: '/dashboard/map',
    icon: FaRegMap,
    key: 'map',
  },
  {
    label: 'Hisobotlar',
    href: '/dashboard/reports',
    icon: FaChartBar,
    key: 'reports',
  },
  {
    label: 'Sozlamalar',
    href: '/dashboard/settings',
    icon: IoSettingsOutline,
    key: 'settings',
  },
];

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();

  const route = useMemo(() => {
    return pathname.split('/')[2] || '';
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* sidebar */}
      <aside className="w-63.75  p-2 border-r border-[#E2E8F0] bg-[#F8FAFC]">
        <div className="mt-4 mb-10 px-6">
          <h3 className="text-[#0F172A] font-bold text-xl tracking-tight">SCADA Monitor</h3>

          <p className="text-[#434655] text-sm">Toshkent shahar</p>
        </div>

        <nav className="space-y-1">
          {menuItems.map(({ label, href, icon: Icon, key }) => {
            const active = route === key;

            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded
                  transition duration-300
                  hover:bg-white hover:shadow-sm
                  ${active ? 'active' : ''}
                `}
              >
                <Icon className="text-[#475569] text-xl" />

                <span className="text-sm font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* main */}
      <div className="flex flex-col flex-1 h-screen ">
        {/* header */}
        <header className="flex items-center justify-between px-6 py-4    bg-white/80 shadow-sm backdrop-blur-md">
          <h1 className="text-lg font-semibold">SCADA Monitoring</h1>

          <button className="px-3 py-1.5 text-sm rounded bg-slate-900 text-white hover:opacity-90">
            Refresh
          </button>
        </header>

        {/* content */}
        <main className=" overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
