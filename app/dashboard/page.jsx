'use client';
import React, { useState } from 'react';
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

  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['stations', search],
    queryFn: () => (search ? stationService.search(search) : stationService.getAll()),
  });

  console.log(data);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Stats */}

      {/* search */}
      <input
        placeholder="Qidirish..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-3 py-2 mb-4"
      />

      {/* {isLoading && <p>Loading...</p>}

      {isError && <p>Xatolik yuz berdi</p>} */}

      <StatsComponent />
      <Filters filtered={filtered} setFiltered={setFiltered} />

      {filtered.content === 'card' ? <CardsComponent /> : <TableComponent />}

      <Footer />
    </div>
  );
};

export default DashboardPage;
