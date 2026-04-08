'use client';
import React, { useEffect, useState } from 'react';
import StatsComponent from '@/components/StatsComponent';

import Filters from '@/components/Filters';
import CardsComponent from '@/components/CardsComponent';
import TableComponent from '@/components/TableComponent';
import Footer from '@/components/Footer';

import { useQuery } from '@tanstack/react-query';
import { stationService } from '@/services/stationService';

const DashboardPage = () => {
  const [filtered, setFiltered] = useState({
    type: '',
    status: '',
    search: '',
    content: 'card',
  });

  const [debouncedSearch, setDebouncedSearch] = useState(filtered.search);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(filtered.search);
    }, 1000); // 1 sekund

    return () => clearTimeout(handler);
  }, [filtered.search]);

  // React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['stations', debouncedSearch, filtered.type, filtered.status],
    queryFn: () => {
      // Agar search bo'lsa, search endpoint
      if (debouncedSearch) {
        return stationService.search(debouncedSearch);
      }

      // Type yoki status filter bo'lsa, params bilan getAll
      const params = new URLSearchParams();
      if (filtered.type) params.append('type', filtered.type);
      if (filtered.status) params.append('status', filtered.status);

      return stationService.getAll(params.toString());
    },
    keepPreviousData: true,
  });

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Stats */}

      {isError && <p>Xatolik yuz berdi</p>}

      <StatsComponent />
      <Filters filtered={filtered} setFiltered={setFiltered} />

      {filtered.content === 'card' ? (
        <CardsComponent data={data} isLoading={isLoading} />
      ) : (
        <TableComponent />
      )}

      <Footer />
    </div>
  );
};

export default DashboardPage;
