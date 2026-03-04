"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRouterPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.replace("/auth/login");
      return;
    }

    try {
      const parsed = JSON.parse(storedUser) as { role?: string };
      const role = (parsed.role || "").toLowerCase();

      if (role === "teacher") {
        router.replace("/dashboard/teacher");
      } else if (role === "parent") {
        router.replace("/dashboard/parent");
      } else {
        // default to student dashboard
        router.replace("/dashboard/student");
      }
    } catch {
      router.replace("/auth/login");
    }
  }, [router]);

  return null;
}
