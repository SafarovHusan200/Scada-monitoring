const CardSkeleton = () => (
  <div className="max-w-55.5 p-6 flex justify-between gap-1 w-full rounded-lg border-l-4 bg-white shadow-sm animate-pulse">
    <div className="space-y-2 w-full">
      <div className="h-3 w-24 bg-gray-200 rounded"></div>
      <div className="h-8 w-16 bg-gray-200 rounded"></div>
    </div>

    <div className="w-11.5 h-11.5 rounded-lg bg-gray-200"></div>
  </div>
);

export default CardSkeleton;
