"use client";
import { useSearchParams } from "next/navigation";

export const useGetQueryParam = () => {
  const searchParams = useSearchParams();

  const getQueryParam = (name: string): string | undefined => {
    return searchParams.get(name) ? String(searchParams.get(name)) : undefined;
  };

  return getQueryParam;
};
