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

  try {
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
  
      try {
        return await response.json();
      } catch (error) {
        return response;
      }
    } else {
      const errorJson = await response.json();
      throw new Error(JSON.stringify(errorJson));
    }
  } catch (error) {
    throw error;
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
  return fireRequest("users/register/", "POST", {
    username,
    email,
    name,
    password,
  });
};

export const logout = () => {
  return fireRequest("users/logout/", "POST", {});
};

export const getUser = (id: number) => {
  return fireRequest(`users/${id}/`, "GET");
};

export const getUserByUsername = (username: string) => {
  return fireRequest(`users/get_by_username/${username}/`, "GET");
};

export const inviteUser = (users: number[], board: number) => {
  return fireRequest(`boards/${board}/invite_member/`, "POST", {users});
};

export const removeUser = (username: string, board: number) => {
  return fireRequest(`boards/${board}/remove_member/`, "POST", {username});
};

export const dashboardCount = () => {
  return fireRequest("dashboard/", "GET");
};

// Board APIs
export const getBoards = () => {
  return fireRequest("boards/", "GET");
}

export const getBoard = (id: number) => {
  return fireRequest(`boards/${id}/`, "GET");
}

export const createBoard = (name: string, description?: string) => {
  return fireRequest("boards/", "POST", { name, description });
}

export const updateBoard = (id: number, name?: string, description?: string) => {
  return fireRequest(`boards/${id}/`, "PATCH", { name, description });
}

// Column APIs
export const addColumn = (boardId: number, title: string) => {
  return fireRequest(`columns/`, "POST", { title, board: boardId });
}

export const updateColumn = (id: number, title: string) => {
  return fireRequest(`columns/${id}/`, "PATCH", { title });
}

export const deleteColumn = (id: number) => {
  return fireRequest(`columns/${id}/`, "DELETE");
}

export const getColumn = (coluumnId: number) => {
  return fireRequest(`columns/${coluumnId}/`, "GET");
}

export const sortColumn = (order: number[]) => {
  return fireRequest(`sort/column/`, "POST", { order });
}

export const getTask = (taskId: number) => {
  return fireRequest(`tasks/${taskId}/`, "GET");
}

export const createTask = (title: string, column: number, labels: number[], assignees: number[], due_date: string, description?: string) => {
  return fireRequest("tasks/", "POST", { title, description, column, labels, assignees, due_date });
}

export const updateTask = (id: number, title?: string, column?: number, labels?: number[], assignees?: number[], due_date?: string, description?: string, finished?: boolean, priority?: "L" | "M" | "H") => {
  return fireRequest(`tasks/${id}/`, "PATCH", { title, description, column, labels, assignees, due_date, finished, priority });
}

export const deleteTask = (id: number) => {
  return fireRequest(`tasks/${id}/`, "DELETE");
}

export const sortTasks = (board: number, order: number[], tasks: Record<string, number[]>) => {
  return fireRequest(`sort/task/`, "POST", { board, order, tasks });
}

export const changeAssignees = (assignees: number[], task: number) => {
  return fireRequest(`tasks/${task}/`, "PATCH", { assignees });
}

export const archiveTask = (task: number) => {
  return fireRequest(`tasks/${task}/archive/`, "DELETE");
}
