import { GenreDTO } from "@/DTO/genreDTO";

import { api } from "@/services/api";
import { useQuery, } from "@tanstack/react-query";

async function fetcher() {
    const response = await api.get('/genres')
    return response.data
}

export function useGenres() {
    return useQuery<GenreDTO[], Error>({
        queryKey: ['useGenres'],
        queryFn: fetcher
    })
}