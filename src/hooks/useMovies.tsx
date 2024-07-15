import { MovieDTO } from "@/DTO/movieDTO";
import { api } from "@/services/api";
import { useQuery, } from "@tanstack/react-query";

async function fetcher() {
    const response = await api.get('/movies')
    return response.data
}

export function useMovies() {
    return useQuery<MovieDTO[], Error>({
        queryKey: ['useMovies'],
        queryFn: fetcher
    })
}