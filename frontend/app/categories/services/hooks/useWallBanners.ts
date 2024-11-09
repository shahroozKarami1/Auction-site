import { useQuery } from "@tanstack/react-query";
import { fetchWallBanners } from "../api/categoryApi";

export const useWallBaneers = (categorySlug: string) => {
  return useQuery(
    ["wall-banners", categorySlug],
    () => fetchWallBanners(categorySlug),
    {
      enabled: !!categorySlug,
    }
  );
};
