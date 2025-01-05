import Link from "next/link";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import styles from "./index.module.css";
import {env} from "@/env";
import {auth} from "@/server/auth";
import Track from "@/client/Track";
import Script from "next/script";

export default async function Home() {
  auth


  console.log("Searching Spotify for The Beatles...");

  const accessToken = (await auth()).token;
  const api = SpotifyApi.withAccessToken(
      env.AUTH_SPOTIFY_ID,
      accessToken
  );

  const items = await api.currentUser.tracks.savedTracks();

  return (
      <div>
        {items.items.map((item) => (
            <Track key={item.track.id} track={item.track}/>))}
      </div>
  );
}
