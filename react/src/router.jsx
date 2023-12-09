import { Navigate, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home';
import Layout from './layouts/Layout'

const router = createBrowserRouter([
    // Add layout with these children
    {
        path: '/',
        element: <Layout />,
        children: [{
            path: '/',
            element: <Home />
        }]
    },
    {
        path: '*',
        element: <Navigate to='/' />
    },
])

export default router;