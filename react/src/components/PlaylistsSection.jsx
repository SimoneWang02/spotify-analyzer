import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import TracksList from './TracksList'

export default function PlaylistsSection(props) {
    const playlistsItems = props.playlists?.items;

    const tracksSectionRef = useRef();
    const [tracks, setTracks] = useState()

    const getTracks = async (key) => {
        await axios.get(playlistsItems[key].tracks.href, {
            headers: {
                Authorization: `Bearer ${props.token}`
            },
        }).then(async res => {
            var stringIDs = ""
            res.data.items.map((element) => {
                stringIDs += element.track.id + ','
            })

            const {data} = await axios.get(`${import.meta.env.VITE_SPOTIFY_API_BASE_URL}/audio-features`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                },
                params: {
                    ids: stringIDs
                },
            })

            res.data.items = Object.keys(res.data.items).map((key) => {
                return {...res.data.items[key], audio_features: data.audio_features[key]}
            })
             
            setTracks(res.data)
        })
    }

    const handleClick = () => {
        tracksSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    if (props.playlists)
    return (
        <div className='bg-yellow-400'>
            <div className="bg-slate-600 py-12 flex flex-row flex-wrap justify-center gap-8">
                {
                    Object.keys(playlistsItems).map((key) => {
                            return <img onClick={async () => {await getTracks(key)}} className="w-[15%] aspect-square object-cover" key={key} src={playlistsItems[key].images[0].url} />
                        }
                    )
                }
            </div>

            <div ref={tracksSectionRef} >
                <TracksList tracks={tracks} />
            </div>
        </div>
    ) 
}