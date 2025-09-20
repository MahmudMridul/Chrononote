const baseUrl = import.meta.env.VITE_API_URL;

export const apiRequest = async (
  endpoint,
  method = "GET",
  creds = false,
  auth = false,
  body = null
) => {
  try {
    let headers = {
      Accept: "application/json",
    };

    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    if (auth) {
      const token = getAccessToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const credentials = creds ? "include" : "same-origin";
    body = body instanceof FormData ? body : body ? JSON.stringify(body) : null;
    endpoint = `${baseUrl}/${endpoint}`;
    
    const response = await fetch(endpoint, {
      method,
      headers,
      credentials,
      body,
    });

    return await response.json();

  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};
