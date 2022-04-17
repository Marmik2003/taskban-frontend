import { createContext, useContext, useState } from "react";
import { fakeAuthProvider } from "../fakeAuth";

interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

const userData = JSON.parse(localStorage.getItem("user") || '{}');
const AuthContext = createContext<AuthContextType>(userData!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = useState<any>(userData.user);

  let signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };
  localStorage.setItem("user", JSON.stringify(value));

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };