// /hooks/useRedirectIfAuthenticated.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const useRedirectIfAuthenticated = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);
};

export default useRedirectIfAuthenticated;
