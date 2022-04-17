import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  const notify = () =>
    toast("You must be logged in to view this page.", {
      position: toast.POSITION.TOP_RIGHT,
      type: toast.TYPE.ERROR,
    });
  useEffect(() => {
    if (!auth.user) {
      notify();
    }
  }, [auth.user]);

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
export default RequireAuth;
