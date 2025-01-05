import { type DefaultSession, type NextAuthConfig } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import {env} from "@/env";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    SpotifyProvider({
      clientId: env.AUTH_SPOTIFY_ID,
      clientSecret: env.AUTH_SPOTIFY_SECRET,
      authorization: { url: 'https://accounts.spotify.com/en/authorize', params: {
        client_id: env.AUTH_SPOTIFY_ID,
        response_type: 'code',
        redirect_uri: 'http://localhost:3001/api/auth/callback/spotify',
        code_challenge: 'rBADWsXZMyHSLTvfSjCUCGofNW7rCigHv4hlWVI_MSM',
        code_challenge_method: 'S256',
        scope: 'user-read-playback-state user-modify-playback-state playlist-read-private user-library-read user-read-currently-playing app-remote-control streaming playlist-read-private user-read-playback-position' } },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      token,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    jwt({ token, account }) {
      if(account){
        token.access_token = account.access_token;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
