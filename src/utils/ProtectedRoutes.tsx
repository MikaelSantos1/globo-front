

import { Navigate, Outlet } from "react-router-dom"

export function ProtectedRoutes() {

    const token = localStorage.getItem('authToken')
    return token ? <Outlet /> : <Navigate to='/login' replace />


}