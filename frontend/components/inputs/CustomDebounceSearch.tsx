import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { FiSearch } from "react-icons/fi";

type CustomDebounceSearchProps = {
  value: string;
  onChange: (value: string) => void;
  delay?: number; // Debounce delay in milliseconds
  placeholder?: string;
  className?: string;
};

const CustomDebounceSearch = ({
  value,
  onChange,
  delay = 500,
  placeholder = "Search...",
  className = "",
}: CustomDebounceSearchProps) => {
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(searchTerm);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay, onChange]);

  return (
    <div className={`relative flex items-center ${className}`}>
      <FiSearch className="absolute left-3 text-gray-400" />
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-4 py-2 ring-0 border-2 focus-visible:ring-offset-0 focus-visible:ring-1 rounded-md w-full"
      />
    </div>
  );
};

export default CustomDebounceSearch;
