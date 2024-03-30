import { apiUrl } from "./apiConfig";

const checkTokenValidity = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const response = await fetch(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 401 || response.status === 404) {
      localStorage.removeItem("token");
      return false;
    }
    return response.ok;
  } catch (error) {
    localStorage.removeItem("token");
    console.error("Error during token validation", error);
    return false;
  }
};

export { checkTokenValidity };
