type ButtonProps = {
  color: string;
  hover: string;
  text: string;
};

export const Button = ({ color, hover, text }: ButtonProps) => {
  return (
    <button
      className={`bg-[${color}] text-white rounded max-sm:p-1 p-2 w-full hover:bg-[${hover}] transition-all`}
    >
      {text}
    </button>
  );
};
