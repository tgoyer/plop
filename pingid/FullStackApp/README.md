# Fullstack OIDC + JWT App

This project contains a .NET 8 Web API with JWT-based auth using PingID Federate and a React + Vite frontend using `oidc-client-ts`.

## Setup

### API
```bash
cd Api
# Update appsettings.json with authority and client_id if needed
# Run the API
dotnet run
```

### ClientApp
```bash
cd ClientApp
npm install
npm run dev
```

Make sure PingID is configured to allow:
- Authorization Code + PKCE
- Refresh tokens
- Silent renew redirect URI

## Folder Structure
- `Api/` - ASP.NET Core API
- `ClientApp/` - React + Vite frontend
