import { useEffect } from "react";
import userManager from "./AuthService";

function SilentRenew() {
  useEffect(() => {
    userManager.signinSilentCallback().catch(console.error);
  }, []);
  return <div>Silent renew in progress...</div>;
}

export default SilentRenew;
