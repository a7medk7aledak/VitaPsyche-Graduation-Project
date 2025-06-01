import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { useRouter } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import SpinnerLoading from "@components/loading/SpinnerLoading";

interface WithAuthProps {
  allowedRoles?: string[];
}

export default function withAuth<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  { allowedRoles = [] }: WithAuthProps = {}
) {
  return function ProtectedRoute(props: T) {
    const { isAuthenticated, user, token } = useSelector(
      (state: RootState) => state.auth
    );
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!token) {
        router.replace("/signin"); // Redirect to sign-in if no token
      } else if (!isAuthenticated || !user) {
        setLoading(true); // Wait until auth state is confirmed
      } else if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        router.replace("/unauthorized"); // Redirect if user role is invalid
      } else {
        setLoading(false); // Authentication confirmed
      }
    }, [isAuthenticated, user, token, router]);

    if (loading) {
      return <SpinnerLoading message="Preparing your experience..." />;
    }

    return <WrappedComponent {...props} />;
  };
}
