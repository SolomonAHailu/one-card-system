import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const UserDetailFooter = ({
  page,
  setPage,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const t = useTranslations("adminusers");
  return (
    <div className="w-full flex justify-center items-center flex-col gap-y-8">
      <div className="flex items-center justify-around w-3/5 gap-y-1">
        {page == 1 ? (
          <Button
            className="bg-[#3A5DD9] hover:bg-[#2a4bc6] text-white w-full"
            onClick={() => setPage(2)}
          >
            {t("next")}
          </Button>
        ) : (
          <Button
            className="bg-[#3A5DD9] hover:bg-[#2a4bc6] text-white w-full"
            onClick={() => setPage(1)}
          >
            {t("prev")}
          </Button>
        )}
      </div>
      <div className="flex flex-col items-center gap-y-6 w-3/4">
        <div className="w-full h-[10px] md:h-[14px] bg-secondary-foreground/30 overflow-hidden rounded-lg">
          <div
            className={`${page === 1 ? "w-1/3" : "w-full"}     
        } rounded-l-lg bg-[#3A5DD9] h-full`}
          />
        </div>
        <p>{page}/2</p>
      </div>
    </div>
  );
};

export default UserDetailFooter;
