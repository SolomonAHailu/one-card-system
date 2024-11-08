import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales: string[] = ["en", "am"];

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  if (!locales.includes(locale as any)) notFound();
  const logininImport = (await import(`./messages/${locale}/common/login.json`))
    .default;
  const navbarImport = (await import(`./messages/${locale}/common/navbar.json`))
    .default;
  const adminSidebarImport = (
    await import(`./messages/${locale}/admin/sidebar.json`)
  ).default;
  const adminRoleImport = (
    await import(`./messages/${locale}/admin/roles.json`)
  ).default;
  const adminUserImport = (
    await import(`./messages/${locale}/admin/users.json`)
  ).default;
  const adminPermissionImport = (
    await import(`./messages/${locale}/admin/permission.json`)
  ).default;
  const adminDeviceImport = (
    await import(`./messages/${locale}/admin/devices.json`)
  ).default;
  const registrarSidebarImport = (
    await import(`./messages/${locale}/registrar/sidebar.json`)
  ).default;
  return {
    messages: {
      ...logininImport,
      ...navbarImport,
      ...adminSidebarImport,
      ...adminRoleImport,
      ...adminUserImport,
      ...adminPermissionImport,
      ...adminDeviceImport,
      ...registrarSidebarImport,  
    },
  };
});
