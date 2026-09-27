import urls from "./urls";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.PUBLIC_API_URL ||
  "http://localhost:3000/api/v1";

export const redirectToGoogleAuth = () => {
  window.location.href = `${API_BASE_URL}${urls.googleLogin}`;
};
