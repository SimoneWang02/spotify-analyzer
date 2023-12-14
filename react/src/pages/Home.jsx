import axiosClient from "../axios-client";
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import LoginScreen from "../components/LoginScreen";
import NavigationBar from "../components/NavigationBar";
import PlaylistsSection from "../components/PlaylistsSection";

export default function Home() {
    const [token, setToken] = useState()
    const [playlists, setPlaylists] = useState()

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
        await axios.get(`${import.meta.env.VITE_SPOTIFY_API_BASE_URL}/me/playlists`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        .then(res => setPlaylists(res.data))
        .catch(err => {
            // If token expired, then logout
            if (err.response.status == '401')
                logout()
        })
    }

    if (!token)
    return (
        <LoginScreen />
    )

    return (
        <div>
            <NavigationBar function={logout} />

            <div className="px-[60px]">
                <PlaylistsSection playlists={playlists} token={token} />
            </div>
        </div>
    )
}