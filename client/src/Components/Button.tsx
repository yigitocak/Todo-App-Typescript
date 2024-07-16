type ButtonProps = {
  primary: string;
  text: string;
};

export const Button = ({ primary, text }: ButtonProps) => {
  return (
    <button
      className={`text-white rounded max-sm:p-1 p-2 w-full transition-all ${primary ? "bg-[#345a80] hover:bg-[#274461]" : "bg-[#4f7ca8] hover:bg-[#375775]"}`}
    >
      {text}
    </button>
  );
};
