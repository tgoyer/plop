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
