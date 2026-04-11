'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import UpdateTime from '@/context/UpdateTime';

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <UpdateTime>{children}</UpdateTime>
    </QueryClientProvider>
  );
}
