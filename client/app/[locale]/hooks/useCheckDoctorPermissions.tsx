// hooks/useCheckDoctorPermissions.ts
import { RootState } from "@store/store";
import { useSelector } from "react-redux";

/**
 * A custom hook to check permissions related to doctor profiles
 * @param doctorId - The ID of the doctor being viewed (from URL or props)
 * @returns Permission-related data and helper functions
 */
export const useCheckDoctorPermissions = (doctorId: string | number | null) => {
  // Get user info from Redux store
  const user = useSelector((state: RootState) => state.auth.user);
  const role = user?.role;
  const loggedInDoctorId = user?.doctor_details?.id;

  // Convert doctorId to number if it's a string
  const urlDoctorId =
    typeof doctorId === "string" ? parseInt(doctorId, 10) : doctorId;

  // Check various permission scenarios
  const isAdmin = role === "admin";
  const isDoctor = role === "doctor";
  const isLoggedInDoctor = isDoctor && loggedInDoctorId === urlDoctorId;

  // Main permission checks
  const hasEditPermission = isAdmin || isLoggedInDoctor;
  const canReview = !isLoggedInDoctor; // Can't review own profile
  const canBook = !isLoggedInDoctor; // Can't book own appointments

  return {
    user,
    role,
    isAdmin,
    isDoctor,
    isLoggedInDoctor,
    hasEditPermission,
    canReview,
    canBook,
    loggedInDoctorId,
    urlDoctorId,
  };
};
