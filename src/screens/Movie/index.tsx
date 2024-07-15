import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { useMoviesDetails } from "@/hooks/useMovieDetails";
import { api } from "@/services/api";
import { CircleUserRound, Star, } from "lucide-react";
import { useState } from "react";

import { useParams } from "react-router-dom";

export function Movie() {
    const { movieId } = useParams()

    const { data } = useMoviesDetails(movieId as string)
    const [rating, setRating] = useState(0);

    const handleRating = async (value: number) => {
        setRating(value);
        api.post(`movie/vote/${movieId}`, {
            rating: value
        })
    };
    return (

        <div className="min-h-screen flex-col">
            <Header />
            <div className="p-12">
                <div className="mb-16">
                    <h1 className="text-3xl font-bold">
                        {data?.name}
                    </h1>
                    <div className="flex gap-8 mt-4">
                        <Badge>{data?.genre.name}</Badge>
                        {
                            data?.rating && <div className="flex gap-2">

                                <p className="text-lg text-slate-50">
                                    {data?.rating.toFixed(2)}
                                </p>
                                <Star />
                            </div>
                        }
                    </div>

                </div>

                <div>
                    <h1 className="text-xl font-bold text-zinc-500">
                        Descrição
                    </h1>
                    <p className="text-lg text-slate-50">
                        {data?.description}
                    </p>
                </div>
                <div className="mt-12">
                    <h1 className="text-xl font-bold text-zinc-500">
                        Avaliar Filme
                    </h1>
                    <div className="flex gap-4 mt-2">
                        {[1, 2, 3, 4].map((value) => (
                            <Star

                                fill={rating >= value ? 'rgb(250 204 21)' : ''}
                                key={value}
                                onClick={() => handleRating(value)}
                                className={`cursor-pointer ${rating >= value ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                    {rating > 0 && (
                        <p className="text-lg mt-2">
                            Você avaliou o filme com {rating} estrela(s).
                        </p>
                    )}
                </div>
                {
                    data && data?.movieCast?.length > 0 &&
                    <div className="mt-12">
                        <h1 className="text-xl font-bold text-zinc-500">
                            Elenco
                        </h1>
                        <div className="flex gap-6">

                            {
                                data?.movieCast.map((item) => (
                                    <div className="flex flex-col justify-center items-center">
                                        <CircleUserRound size={120} />
                                        <p className="text-lg font-bold text-center">{item.person.type}</p>
                                        <p className="text-lg  text-center">{item.person.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                }


            </div>
        </div>
    )
}