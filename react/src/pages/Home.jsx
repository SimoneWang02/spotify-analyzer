import axiosClient from "../axios-client";
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import LoginScreen from "../components/LoginScreen";
import NavigationBar from "../components/NavigationBar";
import PlaylistsSection from "../components/PlaylistsSection";

export default function Home() {
    const [token, setToken] = useState()
    const [tracks, setTracks] = useState()
    const [tempos, setTempos] = useState()
    const [playlists, setPlaylists] = useState()

    const playlist_id = useRef()

    useEffect(() => {
        getAccessToken()
    }, [])

    useEffect(() => {
        if (token)
            getUserPlaylists()
    }, [token])

    // Store ACCESS_TOKEN to remember the authentication
    const getAccessToken = () => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
    
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
    
        setToken(token)
    }

    // Remove the ACCESS_TOKEN to log out
    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const getUserPlaylists = async () => {
        const {data} = await axios.get(`${import.meta.env.VITE_SPOTIFY_API_BASE_URL}/me/playlists`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })

        setPlaylists(data)
    }

    const getPlaylist = async (e) => {
        e.preventDefault()
        
        const {data} = await axios.get(`${import.meta.env.VITE_SPOTIFY_API_BASE_URL}/playlists/${playlist_id.current.value}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })

        setTracks(data.tracks.items)

        getTempos(data.tracks.items)
    }

    const getTempos = async (items) => {
        let longString = ''
        Object.keys(items).map((key) => {
            longString += items[key].track.id + ','
        })

        const {data} = await axios.get(`${import.meta.env.VITE_SPOTIFY_API_BASE_URL}/audio-features`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                ids: longString
            }
        })

        setTempos(data.audio_features)
    }

    if (!token)
    return (
        <LoginScreen />
    )

    return (
        <div className="px-[60px]">
            <PlaylistsSection playlists={playlists} token={token} />

            { token && false &&
                <form onSubmit={getPlaylist}>
                    <input ref={playlist_id} value="6InOGBdQhdtym3ybFEEBNn" className="bg-black text-white px-4 py-2 w-[70%]" placeholder="Playlist ID" />
                    <button className="bg-black text-white px-4 py-2 ml-2" type="submit">Submit</button>
                </form>
            }

            {
                tracks &&
                    Object.keys(tracks).map((key) => {
                        return <p key={key} className="text-black">{tracks[key].track.name} {tempos && tempos[key] && tempos[key].tempo}</p>
                })
            }
        </div>
    )
}