import { toast } from "react-toastify";
import { login, logout, register } from "./APIMethods";

const authProvider = {
  isAuthenticated: false,
  async signin(callback: VoidFunction, username: string, password: string) {
    await login(username, password)
      .then((res) => {
        this.isAuthenticated = true;
        localStorage.setItem("token", res.token);
        localStorage.setItem("expiry", res.expiry);
        callback();
      })
      .catch((err) => {
        this.isAuthenticated = false;
      });
  },
  async signup(
    callback: VoidFunction,
    username: string,
    email: string,
    name: string,
    password: string,
  ) {
    await register(username, password, email, name)
      .then((res) => {
        this.isAuthenticated = true;
        localStorage.setItem("token", res.token);
        localStorage.setItem("expiry", JSON.parse(JSON.stringify({expiry: (new Date()).setDate((new Date()).getDate() + 20)})).expiry);
        localStorage.setItem("user", JSON.stringify(res.user));
        callback();
      })
      .catch((err) => {
        toast.error(`Unable to register, ${(err as Error).message}`);
        this.isAuthenticated = false;
      });
  },
  async signout(callback: VoidFunction) {
    this.isAuthenticated = false;
    localStorage.removeItem("expiry");
    localStorage.removeItem("user");
    await logout();
    localStorage.removeItem("token");
    callback();
  },
};

export { authProvider };
