'use client';

import { statsService } from '@/services/statsService';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { RiWifiOffLine } from 'react-icons/ri';

const CardSkeleton = () => (
  <div className="max-w-55.5 p-6 flex justify-between gap-1 w-full rounded-lg border-l-4 bg-white shadow-sm animate-pulse">
    <div className="space-y-2 w-full">
      <div className="h-3 w-24 bg-gray-200 rounded"></div>
      <div className="h-8 w-16 bg-gray-200 rounded"></div>
    </div>

    <div className="w-11.5 h-11.5 rounded-lg bg-gray-200"></div>
  </div>
);

const StatsComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: statsService.getStats,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton className="col-span-2 sm:col-span-1" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      <div className="p-4 sm:p-6 flex justify-between gap-1 w-full rounded-lg border-l-4 border-l-[#004AC6] bg-white shadow-sm">
        <div>
          <p className="text-[#434655] text-xs font-bold leading-4 tracking-[0.6px] uppercase mb-1">
            JAMI OBYEKTLAR
          </p>
          <h3 className="text-[#191C1E] text-3xl font-black leading-9">
            {data?.data?.stations?.total}
          </h3>
        </div>
        <div className="w-11.5 h-11.5 flex justify-center p-3 rounded-lg bg-blue-600/10">
          <img src="/icons/data.svg" />
        </div>
      </div>

      <div className="p-4 sm:p-6 flex justify-between gap-1 w-full rounded-lg border-l-4 border-l-[#006229] bg-white shadow-sm">
        <div>
          <p className="text-[#434655] text-xs font-bold leading-4 tracking-[0.6px] uppercase mb-1">
            Normal
          </p>
          <h3 className="text-[#006229] text-3xl font-black leading-9">
            {data?.data?.stations?.normal}
          </h3>
        </div>
        <div className="w-11.5 h-11.5 flex justify-center p-3 rounded-lg bg-[#006229]/10">
          <img src="/icons/checked.svg" />
        </div>
      </div>

      <div className="relative p-4 sm:p-6 flex justify-between gap-1 w-full rounded-lg border-l-4 border-l-[#F97316] bg-white shadow-sm">
        <div>
          <p className="text-[#434655] text-xs font-bold leading-4 tracking-[0.6px] uppercase mb-1">
            Ogohlantirish
          </p>
          <h3 className="text-[#F97316] text-3xl font-black leading-9">
            {data?.data?.stations?.warning}
          </h3>
        </div>
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-11.5 h-11.5 flex justify-center p-3 rounded-lg bg-[#F97316]/10">
          <img src="/icons/warning.svg" />
        </div>
      </div>

      <div className="p-4 sm:p-6 flex justify-between gap-1 w-full rounded-lg border-l-4 border-l-[#BA1A1A] bg-white shadow-sm">
        <div>
          <p className="text-[#434655] text-xs font-bold leading-4 tracking-[0.6px] uppercase mb-1">
            Kritik
          </p>
          <h3 className="text-[#BA1A1A] text-3xl font-black leading-9">
            {data?.data?.stations?.critical}
          </h3>
        </div>
        <div className="w-11.5 h-11.5 flex justify-center p-3 rounded-lg bg-[#BA1A1A]/10">
          <img src="/icons/kritik.svg" />
        </div>
      </div>

      <div className="p-4 sm:p-6 flex justify-between gap-1 w-full rounded-lg border-l-4 border-l-gray-700 bg-white shadow-sm col-span-2 sm:col-span-1">
        <div>
          <p className="text-[#434655] text-xs font-bold leading-4 tracking-[0.6px] uppercase mb-1">
            Offline
          </p>
          <h3 className="text-gray-700 text-3xl font-black leading-9">
            {data?.data?.stations?.offline}
          </h3>
        </div>
        <div className="w-11.5 h-11.5 flex justify-center p-3 rounded-lg bg-gray-200">
          <RiWifiOffLine className="text-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;
