import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const DASHBOARD_URL = "https://skooped-client-dashboard.vercel.app";

export default function SignupRedirect() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const params = searchParams.toString();
    const url = `${DASHBOARD_URL}/signup${params ? `?${params}` : ""}`;
    window.location.href = url;
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground text-sm">Taking you to sign up...</p>
      </div>
    </div>
  );
}
