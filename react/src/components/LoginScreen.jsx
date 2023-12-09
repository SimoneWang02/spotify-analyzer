import { Button } from '@mantine/core';

export default function LoginScreen() {
    const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI
    const SCOPE = import.meta.env.VITE_SCOPE
    const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT
    const RESPONSE_TYPE = import.meta.env.VITE_RESPONSE_TYPE

    const authentication = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`

    return (
        <div className='h-screen flex justify-center items-center'>
            <Button color="green" radius="xl">
                <a href={authentication}>Connect to Spotify</a>
            </Button>
        </div>
    )
}