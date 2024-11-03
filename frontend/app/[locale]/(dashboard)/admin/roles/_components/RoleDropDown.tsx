"use client";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslations } from "next-intl";

const RoleDropDown = ({
  setUsersRoleId,
}: {
  setUsersRoleId: (id: number) => void;
}) => {
  const t = useTranslations("roles");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("Admin");
  const { roles, isRoleError, isRoleLoading } = useSelector(
    (state: RootState) => state.role
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-[300px] justify-between"
        >
          {value
            ? t(
                roles
                  .find((role) => role.role_name === value)
                  ?.role_name.toLowerCase() ?? t("searchrole")
              )
            : t("searchrole")}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder={t("searchrole")} />
          <CommandList>
            <CommandEmpty>No Role Found.</CommandEmpty>
            <CommandGroup>
              {roles.map((role) => (
                <CommandItem
                  key={role.ID}
                  value={role.role_name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setUsersRoleId(role.ID);
                    setIsOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === role.role_name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {t(role.role_name.toLowerCase())}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default RoleDropDown;
