import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales: string[] = ["en", "am"];

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  if (!locales.includes(locale as any)) notFound();

  const homepageImport = (await import(`./messages/${locale}/home.json`))
    .default;

  return {
    messages: {
      ...homepageImport,
    },
  };
});
