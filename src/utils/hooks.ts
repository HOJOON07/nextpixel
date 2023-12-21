import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuthGuard = (): void => {
  const router = useRouter();
  const { authUser, isLoading } = useAuthContext();

  useEffect(() => {
    if (!authUser && !isLoading) {
      const currentPath = router.pathname;
      router.push({
        pathname: "/signin",
        query: {
          redirect_to: currentPath,
        },
      });
    }
  }, [router, authUser, isLoading]);
};
