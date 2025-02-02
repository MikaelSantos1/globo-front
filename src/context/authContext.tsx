import { api } from '@/services/api';
import axios from 'axios';
import React, { createContext, useState, useEffect, ReactNode, FC, } from 'react';



interface AuthContextType {
    user: User;
    login: (user: User) => void;
    logout: () => void;
}
interface User {
    token: string
    id?: string;
    name?: string;
    role?: 'ADMIN' | 'USER'
}
interface AuthProviderProps {
    children: ReactNode;
}



export const AuthContext = createContext<AuthContextType>({} as AuthContextType);


export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>({} as User);

    const login = (user: User) => {


        localStorage.setItem('authToken', user.token);
        localStorage.setItem('userRole', user.role as string);



        setUser({
            token: user.token,
            id: user.id,
            name: user.name,
            role: user.role
        });

    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser({} as User);

    };
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        const getUserProfile = async () => {
            const { data } = await api.get('/me')

            setUser(prevState => ({
                ...prevState,
                id: data.user.id,
                name: data.user.name,
                role: data.user.role
            }))
        }
        if (token) {
            getUserProfile()
        }

    }, []);
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
