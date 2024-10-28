"use client";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import ReactCountryFlag from "react-country-flag";
import { FaGlobe } from "react-icons/fa";

const LanguangeSelector = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const selectedLanguage = currentPath.slice(1, 3).toUpperCase();

  const handleSelectedLanguage =
    (language: string) =>
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const newPath = `/${language.toLowerCase()}${currentPath.slice(3)}`;
      router.push(newPath);
    };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-2 py-1 flex gap-2 justify-center items-center">
        {selectedLanguage === "EN" ? (
          <FaGlobe className="text-blue-400 text-xl"/>
        ) : (
          <ReactCountryFlag countryCode="ET" svg className="text-xl"/>
        )}
        <p>{selectedLanguage}</p>
        <IoIosArrowDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-10">
        <DropdownMenuItem
          onClick={handleSelectedLanguage("EN")}
          className="flex items-center gap-2"
        >
          <FaGlobe className="text-blue-400 text-xl"/>
          <p>EN</p>
        </DropdownMenuItem>
        <hr className="border-[#5A7184] border-opacity-20" />
        <DropdownMenuItem
          onClick={handleSelectedLanguage("AM")}
          className="flex items-center gap-2"
        >
          <ReactCountryFlag countryCode="ET" svg className="text-xl"/>
          <p>ET</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguangeSelector;
