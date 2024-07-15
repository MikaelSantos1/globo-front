import { movieDetailsDTO } from "@/DTO/movieDetailtsDTO";

import { api } from "@/services/api";
import { useQuery, } from "@tanstack/react-query";

async function fetcher(id: string) {
    const response = await api.get(`/movie/${id}`)
    return response.data.movie
}

export function useMoviesDetails(id: string) {
    return useQuery<movieDetailsDTO, Error>({
        queryKey: ['useMoviesDetails', id],
        queryFn: () => fetcher(id),
        enabled: !!id
    })
}