import { createAuthClient } from "better-auth/react";
 
// Same-origin by default: talks to /api/auth/*.
export const authClient = createAuthClient();