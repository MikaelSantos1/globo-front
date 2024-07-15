import { castDTO } from "@/DTO/castDTO";


import { api } from "@/services/api";
import { useQuery, } from "@tanstack/react-query";

async function fetcher() {
    const response = await api.get('/cast')
    return response.data
}

export function useCast() {
    return useQuery<castDTO[], Error>({
        queryKey: ['useCast'],
        queryFn: fetcher,
        staleTime: 1000 * 60 * 10
    })
}