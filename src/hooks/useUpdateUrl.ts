"use client";

import { usePathname, useRouter } from "next/navigation";

export const useUpdateUrl = () => {
  const pathname = usePathname();
  const router = useRouter();

  const updateUrl = (params: Record<string, string | undefined>) => {
    const queryString = Object.entries(params)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}=${encodeURIComponent(value!)}`)
      .join("&");

    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  return updateUrl;
};
