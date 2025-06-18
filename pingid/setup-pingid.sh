#!/bin/bash
set -e

# Create project root
mkdir FullStackApp && cd FullStackApp

# Create solution first
dotnet new sln -n FullStackApp

# Create API project
dotnet new webapi -n Api --no-https
dotnet sln add Api/Api.csproj

# Create folders
mkdir -p Api/Middleware Api/Services Api/Models
mkdir -p ClientApp/src/auth ClientApp/src/routes ClientApp/src/components

# Write appsettings.json
cat > Api/appsettings.json <<EOF
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Jwt": {
    "Authority": "https://your-pingid-server.com",
    "Audience": "your-client-id"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=YourDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}
EOF

# Add ClaimsTransformationMiddleware.cs
cat > Api/Middleware/ClaimsTransformationMiddleware.cs <<EOF
using System.Security.Claims;

public class ClaimsTransformationMiddleware
{
    private readonly RequestDelegate _next;

    public ClaimsTransformationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context, IUserClaimsService claimsService)
    {
        if (context.User.Identity?.IsAuthenticated == true)
        {
            var username = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!string.IsNullOrEmpty(username))
            {
                var additionalClaims = await claimsService.GetClaimsForUserAsync(username);
                var id = new ClaimsIdentity(additionalClaims);
                context.User.AddIdentity(id);
            }
        }
        await _next(context);
    }
}
EOF

# Add IUserClaimsService.cs
cat > Api/Services/IUserClaimsService.cs <<EOF
using System.Security.Claims;

public interface IUserClaimsService
{
    Task<IEnumerable<Claim>> GetClaimsForUserAsync(string username);
}
EOF

# Add UserClaimsService.cs
cat > Api/Services/UserClaimsService.cs <<EOF
using System.Security.Claims;

public class UserClaimsService : IUserClaimsService
{
    private readonly YourDbContext _db;

    public UserClaimsService(YourDbContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<Claim>> GetClaimsForUserAsync(string username)
    {
        var user = await _db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Username == username);
        if (user == null) return Enumerable.Empty<Claim>();
        return user.Roles.Select(r => new Claim(ClaimTypes.Role, r.Name));
    }
}
EOF

# Create React app using Vite
npm create vite@latest ClientApp -- --template react-ts
cd ClientApp
npm install

# AuthService.ts
cat > src/auth/AuthService.ts <<EOF
import { UserManager, WebStorageStateStore } from "oidc-client-ts";

const userManager = new UserManager({
  authority: "https://your-pingid-server.com",
  client_id: "your-client-id",
  redirect_uri: "http://localhost:5173/callback",
  post_logout_redirect_uri: "http://localhost:5173/",
  response_type: "code",
  scope: "openid profile email offline_access",
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  automaticSilentRenew: false,
  monitorSession: false,
  loadUserInfo: true,
  silent_redirect_uri: "http://localhost:5173/silent-renew",
});
export default userManager;
EOF

# Callback.tsx
cat > src/auth/Callback.tsx <<EOF
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userManager from "./AuthService";

function Callback() {
  const navigate = useNavigate();
  useEffect(() => {
    userManager.signinRedirectCallback().then(() => navigate("/"));
  }, []);
  return <div>Logging in...</div>;
}

export default Callback;
EOF

# SilentRenew.tsx
cat > src/auth/SilentRenew.tsx <<EOF
import { useEffect } from "react";
import userManager from "./AuthService";

function SilentRenew() {
  useEffect(() => {
    userManager.signinSilentCallback().catch(console.error);
  }, []);
  return <div>Silent renew in progress...</div>;
}

export default SilentRenew;
EOF

# App.tsx
cat > src/App.tsx <<EOF
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
EOF

# Return to root directory
cd ..

# .gitignore
cat > .gitignore <<EOF
node_modules
/dist
.env
.vscode
/bin
/obj
ClientApp/.env.local
ClientApp/node_modules
EOF

# README.md
cat > README.md <<EOF
# Fullstack OIDC + JWT App

This project contains a .NET 8 Web API with JWT-based auth using PingID Federate and a React + Vite frontend using \`oidc-client-ts\`.

## Setup

### API
\`\`\`bash
cd Api
# Update appsettings.json with authority and client_id if needed
# Run the API
dotnet run
\`\`\`

### ClientApp
\`\`\`bash
cd ClientApp
npm install
npm run dev
\`\`\`

Make sure PingID is configured to allow:
- Authorization Code + PKCE
- Refresh tokens
- Silent renew redirect URI

## Folder Structure
- \`Api/\` - ASP.NET Core API
- \`ClientApp/\` - React + Vite frontend
EOF

echo "✅ FullStackApp scaffolded!"
