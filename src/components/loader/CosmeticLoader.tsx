

"use client";

const CosmeticLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-650px)]">
      <div className="relative flex flex-col items-center">
         <div className="absolute w-64 h-64 rounded-full bg-pink-200/50 blur-3xl animate-pulse" />
        {/* Spinner */}
        <div className="relative flex items-center justify-center w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-pink-100 border-t-pink-500 animate-spin" />

          <div className="w-8 h-8 rounded-full bg-pink-400 animate-pulse shadow-lg shadow-pink-200" />
        </div>

        {/* Text */}
        <p className="mt-5 text-xs sm:text-sm tracking-[0.25em] uppercase text-gray-600 font-medium">
          Loading Beauty...
        </p>
      </div>
    </div>
  );
};

export default CosmeticLoader;
