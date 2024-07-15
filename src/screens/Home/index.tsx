import { Header } from "@/components/Header";
import { CardMovie } from "./CardMovie";
import { useMovies } from "@/hooks/useMovies";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
    const { user } = useAuth()
    const { data } = useMovies()

    return (
        <div className=" min-h-screen flex-col  ">
            <Header />
            <div className="p-12">
                {
                    user.role === 'ADMIN' &&
                    <div className="flex w-full justify-end mt-8">
                        <Button size="sm" className="h-12 gap-1" >
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Adcionar novo filme
                            </span>
                        </Button>
                    </div>

                }


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 items-center">
                    {
                        data && data?.length > 0 && data?.map((item) => (
                            <CardMovie data={item} />
                        ))
                    }

                </div>



            </div>
        </div>
    )
}