import { toast } from "react-toastify";
import { history } from "./history";

const API_BASE_URL = "https://k-b.herokuapp.com/api/";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const authenticateUser = async () => {
  me().catch(() => {
    toast.error("Please login to continue", {
      type: toast.TYPE.ERROR,
    });
    history.push("/login");
  });
};

export const fireRequest = async (
  endpoint: string,
  method: RequestMethod = "GET",
  data: any = {}
) => {
  let url, body;
  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join("&")}`
      : "";
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    body = null;
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    body = data ? JSON.stringify(data) : null;
  }

  const token = localStorage.getItem("token");
  if (!["users/login/", "users/register/", "users/logoutall/"].includes(endpoint)) {
    
    const tokenExpiry = localStorage.getItem("expiry");
    if (token && tokenExpiry) {
      const expiry = new Date(tokenExpiry);
      if (expiry < new Date()) {
        localStorage.removeItem("token");
        localStorage.removeItem("expiry");
      }
    } else {
      token && localStorage.removeItem("token");
      tokenExpiry && localStorage.removeItem("expiry");
      toast.error("Please login to continue", {
        type: toast.TYPE.ERROR,
      });
      history.push("/login");
    }
  }
  const auth = token ? `Token ${localStorage.getItem("token")}` : "";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body,
  });

  if (response.ok) {
    if (method === "DELETE" || response.status === 204) return "true";

    const json = await response.json();
    return json;
  } else {
    const errorJson = await response.json();
    throw new Error(errorJson);
  }
};

export const me = () => {
  return fireRequest("users/me/", "GET");
};

export const login = (username: string, password: string) => {
  return fireRequest("users/login/", "POST", { username, password });
};

export const register = (
  username: string,
  password: string,
  email: string,
  name: string
) => {
  console.log(username, password, email, name, "API Fired");
  return fireRequest("users/register/", "POST", {
    username,
    email,
    name,
    password,
  });
};

export const logout = () => {
  return fireRequest("users/logoutall/", "POST", {});
};

export const getUser = (id: Number) => {
  return fireRequest(`users/${id}/`, "GET");
};

export const dashboardCount = () => {
  return fireRequest("dashboard/", "GET");
}

// Board APIs
export const getBoards = () => {
  return fireRequest("boards/", "GET");
}

export const getBoard = (id: Number) => {
  return fireRequest(`boards/${id}/`, "GET");
}

export const createBoard = (name: string, description?: string) => {
  return fireRequest("boards/", "POST", { name, description });
}

export const updateBoard = (id: Number, name?: string, description?: string) => {
  return fireRequest(`boards/${id}/`, "PATCH", { name, description });
}
