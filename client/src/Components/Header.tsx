export const Header = () => {
  return (
    <header className="max-sm:h-[10] h-10 bg-[#deedfc] rounded-t-[8px] flex items-center border-b-2 px-4">
      <div className="flex gap-1.5 justify-center items-center mt-1">
        <div className="w-3 h-3 bg-[#7c868f] rounded-full"></div>
        <div className="w-3 h-3 bg-[#7c868f] rounded-full"></div>
        <div className="w-3 h-3 bg-[#7c868f] rounded-full"></div>
      </div>
      <p className="ml-auto px-6">
        <span className="font-bold">0</span>/3
        <span className="max-sm:hidden"> todos completed</span>
      </p>
    </header>
  );
};
