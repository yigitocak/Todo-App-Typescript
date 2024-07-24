import { useEffect } from "react";

type SnackbarProps = {
  message: string;
  open: boolean;
  onClose: () => void;
};

export const Snackbar = ({ message, open, onClose }: SnackbarProps) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md shadow-md transition-all duration-500 ${
        open ? "opacity-100 bg-gray-800 text-white" : "opacity-0"
      }`}
      onClick={onClose}
    >
      {message}
    </div>
  );
};
