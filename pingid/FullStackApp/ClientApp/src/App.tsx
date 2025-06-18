import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import userManager from "./auth/AuthService";
import Callback from "./auth/Callback";
import SilentRenew from "./auth/SilentRenew";

function AuthenticatedApp() {
  return <h1>Welcome to the protected app!</h1>;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    userManager.getUser().then(user => {
      if (user && !user.expired) {
        setIsAuthenticated(true);
        scheduleTokenRefresh(user.expires_in);
      } else {
        userManager.signinRedirect();
      }
    });
  }, []);

  function scheduleTokenRefresh(expiresIn: number) {
    const refreshBuffer = 60;
    const delay = (expiresIn - refreshBuffer) * 1000;
    setTimeout(async () => {
      try {
        const refreshedUser = await userManager.signinSilent();
        scheduleTokenRefresh(refreshedUser.expires_in);
      } catch (err) {
        console.error("Silent refresh failed", err);
        userManager.signinRedirect();
      }
    }, delay);
  }

  return (
    <Router>
      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route path="/silent-renew" element={<SilentRenew />} />
        <Route path="/" element={isAuthenticated ? <AuthenticatedApp /> : <div>Redirecting...</div>} />
      </Routes>
    </Router>
  );
}

export default App;
