import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userManager from "./AuthService";

function Callback() {
  const navigate = useNavigate();
  useEffect(() => {
    userManager.signinRedirectCallback().then(() => navigate("/"));
  }, [navigate]);
  return <div>Logging in...</div>;
}

export default Callback;
