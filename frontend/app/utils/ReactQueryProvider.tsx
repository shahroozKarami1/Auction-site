"use client";
import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 3,
            staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
            cacheTime: 1000 * 60 * 10, // Cache is valid for 10 minutes
            refetchOnWindowFocus: true, // Refetch on window focus
            // refetchInterval: 3000, // Check for updates every 2 seconds
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={undefined}>{children}</Hydrate>
      {/* {process.env.NODE_ENV !== "production" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )} */}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
