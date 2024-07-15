import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { api } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { signOut } from "@/utils/sign-out";


export function Header() {
    const navite = useNavigate()
    const { register, getValues, handleSubmit, watch } = useForm()

    const queryClient = useQueryClient()
    const onSubmit = async () => {
        const { search } = getValues()

        const { data } = await api.get(`/movies/search?q=${search}`);
        queryClient.setQueryData(['useMovies'], data.movies)
    };
    useEffect(() => {
        const searchValue = watch('search');

        if (!searchValue || searchValue.trim() === '') {
            queryClient.invalidateQueries('useMovies');
        }
    }, [watch('search'), queryClient]);
    return (
        <div className="mx-auto flex  items-center justify-between border-b  bg-zinc-900 px-10 py-8 gap-8" >
            <div className="cursor-pointer" onClick={() => navite('/')}>
                <h1 className="text-amber-50 text-2xl font-bold">IMBD</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 w-full">
                <Input
                    {...register('search')}
                    placeholder="Pesquise por um filme, gênero ou ator"

                />

            </form>
            <Button onClick={signOut}>
                Sair
            </Button>

        </div>
    )
}