

import Home from '@/screens/Home'
import { RegisterMovie } from '@/screens/RegisterMovie'
import SignInPage from '@/screens/SignIn'
import { ProtectedRoutes } from '@/utils/ProtectedRoutes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
export function AppRoutes() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<SignInPage />} path='/login' />
                <Route element={<ProtectedRoutes />} >
                    <Route path='/' element={<Home />} />
                    <Route path='/create' element={<RegisterMovie />} />
                </Route>


            </Routes>
        </BrowserRouter>

    )
}