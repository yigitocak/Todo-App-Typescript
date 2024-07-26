type ButtonProps = {
  color: string;
  hover: string;
  text: string;
  onClick: () => void;
};

export const Button = ({ color, hover, text, onClick }: ButtonProps) => {
  return (
    <button
      className={`text-white rounded max-sm:p-1 p-2 w-full transition-all ${color} ${hover}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
