"use client";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingOverlay from "@/components/common/LoadingOverlay";

export default function Home() {
  const router = useRouter();
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

  return <LoadingOverlay />;
}
