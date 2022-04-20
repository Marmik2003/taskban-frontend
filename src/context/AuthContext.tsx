import { createContext, useContext, useState } from "react";
import { me } from "../APIMethods";
import { authProvider } from "../auth";
import { UserType } from "../types";

interface AuthContextType {
  user: UserType | null;
  signin: (formJson: {
    username: string;
    password: string;
  }, callback: VoidFunction) => void;
  signup: (formJson: {
    username: string;
    email: string;
    name: string;
    password: string;
  }, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

const userData = JSON.parse(localStorage.getItem("user") || '{}');
const AuthContext = createContext<AuthContextType>(userData!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(userData);
  const signin = async (formJson: {
    username: string;
    password: string;
  }, callback: VoidFunction) => {
    return await authProvider.signin(async () => {
      await me().then((user) => {
        setUser({id: user.id, username: user.username, email: user.email, name: user.name});
        localStorage.setItem("user", JSON.stringify(user));
      });
      callback();
    }, formJson.username, formJson.password);
  };

  const signup = async (formJson: {
    username: string;
    email: string;
    name: string;
    password: string;
  }, callback: VoidFunction) => {
    return await authProvider.signup(() => {
      setUser({id: 1, username: formJson.username, email: formJson.email, name: formJson.name});
      callback();
    }, formJson.username, formJson.email, formJson.name, formJson.password);
  };

  const signout = (callback: VoidFunction) => {
    return authProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  const value = { user, signin, signup, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };