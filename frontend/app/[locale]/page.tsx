"use client";
import MaxWidthWrapper from "@/components/common/MaxSizeWrapper";
import { ThemeSelector } from "@/components/common/ThemeSelector";
import { Link } from "@/navigation";
import { RootState } from "@/store";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingOverlay from "@/components/common/LoadingOverlay";

export default function Home() {
  const router = useRouter();
  const t = useTranslations("home");
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const role = useSelector((state: RootState) => state.auth.user?.role);
  const role_name = role?.role_name.toLocaleLowerCase().trim();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/en/login");
    } else {
      router.push(`/en/${role_name}`);
    }
  }, [isAuthenticated, router, role_name]);
  // Avoid rendering if not authenticated

  return <LoadingOverlay />;
}
