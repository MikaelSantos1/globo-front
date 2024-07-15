

import Home from '@/screens/Home'
import { Movie } from '@/screens/Movie'
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
                    <Route path='/movie/:movieId' element={<Movie />} />
                </Route>


            </Routes>
        </BrowserRouter>

    )
}