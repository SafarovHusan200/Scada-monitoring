'use client';
import React, { useContext, useEffect, useState } from 'react';
import StatsComponent from '@/components/StatsComponent';
import Filters from '@/components/Filters';
import CardsComponent from '@/components/CardsComponent';
import TableComponent from '@/components/TableComponent';
import Footer from '@/components/Footer';

import { useQuery } from '@tanstack/react-query';
import { stationService } from '@/services/stationService';
import { UpdateContext } from '@/context/updateContext';

const DashboardPage = () => {
  const { setUpdateTime } = useContext(UpdateContext);

  const [filtered, setFiltered] = useState({
    type: '',
    status: '',
    search: '',
    content: 'card', // server va client bir xil boshlaydi
  });

  // Mount bo'lgandan keyin localStorage dan o'qiymiz
  useEffect(() => {
    const saved = localStorage.getItem('dashboard-content');
    if (saved) {
      setFiltered((prev) => ({ ...prev, content: saved }));
    }
  }, []);

  // content o'zgarganda saqlash
  useEffect(() => {
    localStorage.setItem('dashboard-content', filtered.content);
  }, [filtered.content]);

  const [debouncedSearch, setDebouncedSearch] = useState(filtered.search);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(filtered.search);
    }, 1000);

    return () => clearTimeout(handler);
  }, [filtered.search]);

  const { data, isLoading, isError, dataUpdatedAt } = useQuery({
    queryKey: ['stations', debouncedSearch, filtered.type, filtered.status],
    queryFn: () => {
      if (debouncedSearch) {
        return stationService.search(debouncedSearch);
      }

      const params = new URLSearchParams();
      if (filtered.type) params.append('type', filtered.type);
      if (filtered.status) params.append('status', filtered.status);

      return stationService.getAll(params.toString());
    },
    keepPreviousData: true,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (dataUpdatedAt) {
      setUpdateTime(new Date(dataUpdatedAt));
    }
  }, [dataUpdatedAt]);

  return (
    <div className="w-full flex flex-col gap-8">
      {isError ? (
        <p className="text-red-500">Xatolik yuz berdi {isError}</p>
      ) : (
        <>
          <StatsComponent />
          <Filters filtered={filtered} setFiltered={setFiltered} />

          {filtered.content === 'card' ? (
            <CardsComponent data={data} isLoading={isLoading} />
          ) : (
            <TableComponent data={data} isLoading={isLoading} />
          )}
        </>
      )}

      <Footer />
    </div>
  );
};

export default DashboardPage;
