'use client'

import {type Track} from "@spotify/web-api-ts-sdk";


interface Props {
    track: Track;
}

export default function Track({ track }: Props) {

    return (
        <div>
            <img src={track.album.images[0].url} width={50}/>
            <span>{track.artists.map((artist) => artist.name).join(' ')} - {track.name}</span>
        </div>
    )
}
