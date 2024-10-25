import MaxWidthWrapper from "@/components/common/MaxSizeWrapper";
import { ThemeSelector } from "@/components/common/ThemeSelector";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function Home() {
  // server request async stuff
  const t = useTranslations("home");

  return (
    <MaxWidthWrapper>
      <h1>{t("title")}</h1>
      <p>{t("content")}</p>
    </MaxWidthWrapper>
  );
}
