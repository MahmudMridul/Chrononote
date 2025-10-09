import { apiRequest } from "../api/api";

export const signIn = async (body) => {
  try {
    const res = await apiRequest("auth/signin", "POST", true, false, body);
    if (res && res.success) {
      setAccessTokenDataToLocalStorage(
        res.data.accessToken,
        res.data.accessTokenExpiresAt
      );

      const user = {
        id: res.data.userId,
        username: res.data.username,
        email: res.data.email,
      };
      setUserDataToLocalStorage(user);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error signing in user:", error);
    return false;
  }
};

const setAccessTokenDataToLocalStorage = (token, tokenExpiresAt) => {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("accessTokenExpiresAt", tokenExpiresAt);
};

const removeAccessTokenDataFromLocalStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("accessTokenExpiresAt");
};

const setUserDataToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserDataFromLocalStorage = () => {
  try {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return null;
  }
};

export const removeUserDataFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const isAuthenticatedUser = () => {
  const token = localStorage.getItem("accessToken");
  const tokenExpiresAt = localStorage.getItem("accessTokenExpiresAt");
  const user = getUserDataFromLocalStorage();

  if (!token || !tokenExpiresAt || !user) {
    return false;
  }

  const currentTime = new Date().getTime();
  const expirationTime = new Date(tokenExpiresAt).getTime();

  if (currentTime >= expirationTime) {
    removeAccessTokenDataFromLocalStorage();
    removeUserDataFromLocalStorage();
    return false;
  }

  return true;
};
