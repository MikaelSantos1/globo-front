import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/assets/movie-videos-svgrepo-com.svg"
import { MovieDTO } from "@/DTO/movieDTO";
import { Badge } from "@/components/ui/badge";

interface Props {
    data: MovieDTO
}

export function CardMovie({ data }: Props) {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <div className="flex justify-between">
                    <CardTitle>{data.name}</CardTitle>
                    <Badge>{data.genre.name}</Badge>
                </div>

            </CardHeader>
            <CardContent>
                <img src={Icon} />

            </CardContent>
            <CardFooter>
                <CardDescription>{data.description}</CardDescription>
            </CardFooter>

        </Card>
    )
}