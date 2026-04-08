const CardSkeleton = () => {
  return (
    <div className="w-75 pt-6 rounded-2xl border border-[rgba(195,198,215,0.10)] bg-white shadow-sm animate-pulse">
      {/* header */}
      <div className="px-6 flex items-center justify-between mb-3">
        <div className="h-6 w-40 bg-gray-200 rounded"></div>

        <div className="h-6 w-20 bg-gray-200 rounded-xl"></div>
      </div>

      {/* info */}
      <div className="px-6 space-y-2 mb-7">
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>

        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>

      {/* parameters */}
      <div className="px-6 grid grid-cols-3 gap-2 mb-6">
        <div className="bg-[#F2F4F6] rounded-lg p-2 space-y-2">
          <div className="h-3 w-16 bg-gray-200 rounded mx-auto"></div>
          <div className="h-6 w-10 bg-gray-200 rounded mx-auto"></div>
          <div className="h-3 w-8 bg-gray-200 rounded mx-auto"></div>
        </div>

        <div className="bg-[#F2F4F6] rounded-lg p-2 space-y-2">
          <div className="h-3 w-16 bg-gray-200 rounded mx-auto"></div>
          <div className="h-6 w-10 bg-gray-200 rounded mx-auto"></div>
          <div className="h-3 w-8 bg-gray-200 rounded mx-auto"></div>
        </div>

        <div className="bg-[#F2F4F6] rounded-lg p-2 space-y-2">
          <div className="h-3 w-16 bg-gray-200 rounded mx-auto"></div>
          <div className="h-6 w-10 bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>

      {/* footer */}
      <div className="mt-3 py-3 px-6 flex justify-between items-center border-t border-[rgba(195,198,215,0.10)]">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>

        <div className="h-6 w-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
