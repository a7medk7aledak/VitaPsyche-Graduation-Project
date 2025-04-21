export const getProfileRoute = (role?: string): string => {
  return role === "doctor" ? "/my-profile" : "/profile";
};
