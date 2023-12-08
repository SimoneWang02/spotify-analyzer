import { Navigate, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home';

const router = createBrowserRouter([
    // Add layout with these children
    {
        path: '/',
        element: <Home />
    },
    {
        path: '*',
        element: <Navigate to='/' />
    },
])

export default router;