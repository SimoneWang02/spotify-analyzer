import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import TracksList from './TracksList'

export default function PlaylistsSection(props) {
    const playlistsItems = props.playlists?.items;

    const [tracks, setTracks] = useState()

    const changeTracks = (values) => {
        setTracks(values)
    }

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
            { tracks && <TracksList tracks={tracks} function={changeTracks} /> }
        </div>
    ) 
}