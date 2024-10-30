import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { SearchIcon } from "lucide-react";

const SearchByName = ({
  setName,
  name,
}: {
  setName: (name: string) => void;
  name: string;
}) => {
  const t = useTranslations("adminusers");
  const [searchName, setSearchName] = useState<string>("");
  const [userTryToSearchUsingName, setUserTryToSearchUsingName] =
    useState<boolean>(false);

  useEffect(() => {
    if (userTryToSearchUsingName && searchName === "") {
      setName(searchName);
    }
  }, [userTryToSearchUsingName, searchName, setName]);

  const handleSearchByName = (): void => {
    if (searchName === "") {
      toast.error(t("searchbynamerequired"));
      return;
    }
    setUserTryToSearchUsingName(true);
    setName(searchName.split(" ")[0]);
  };
  return (
    <div className="flex items-center gap-x-2">
      <Input
        className={cn(
          "h-14 min-w-96 focus-visible:ring-1 text-sm mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-0"
        )}
        placeholder={t("searchbyname")}
        value={searchName}
        onChange={(e) => {
          setSearchName(e.target.value);
        }}
      />
      <Button
        className="h-14 w-14 bg-secondary hover:bg-muted-foreground/10 text-primary"
        onClick={() => {
          handleSearchByName();
        }}
      >
        <SearchIcon className="text-6xl" />
      </Button>
    </div>
  );
};

export default SearchByName;
