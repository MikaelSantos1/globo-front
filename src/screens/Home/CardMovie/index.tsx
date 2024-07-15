import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/assets/Red and Blue Movie Night Poster.png"
import { MovieDTO } from "@/DTO/movieDTO";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface Props {
    data: MovieDTO
}

export function CardMovie({ data }: Props) {
    const navigate = useNavigate()
    const truncateDescription = (description: string, maxLength: number) => {
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + "...";
        }
        return description;
    };
    return (
        <Card className="max-w-[350px] cursor-pointer" onClick={() => navigate(`movie/${data.id}`)}>
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
                <CardDescription>{truncateDescription(data.description, 40)}</CardDescription>
            </CardFooter>

        </Card>
    )
}