import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCast } from "@/hooks/useCast";
import { useGenres } from "@/hooks/useGenres";
import { Label } from "@radix-ui/react-label";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledSelect } from "@/components/Select";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";


const registerMovieSchema = z.object({
    movieName: z.string({ message: 'Nome do filme é obrigatório' }).min(1, { message: 'Nome do filme é obrigatório' }),
    description: z.string({ message: 'Descrição é obrigatória' }).min(1, {
        message: 'Descrição é obrigatória'
    }),
    genre: z.string({ message: 'Gênero do filme é obrigatório' }),
    cast: z.array(z.object({
        id: z.string(),
        name: z.string()
    }))
});

type RegisterMovieSchema = z.infer<typeof registerMovieSchema>;

export function RegisterMovie() {
    const { register, handleSubmit, formState: { errors }, control } = useForm<RegisterMovieSchema>({
        resolver: zodResolver(registerMovieSchema)
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "cast"
    });
    const queryClient = useQueryClient()
    const { data: genres } = useGenres();
    const { data: cast } = useCast();
    const { toast } = useToast()
    const navigate = useNavigate();
    if (fields.length === 0) {
        append({ id: '', name: '' });
    }
    const { mutate, isPending } = useMutation({
        mutationFn: (data: RegisterMovieSchema) => {
            const cast = data.cast.map((item) => item.id).filter((item) => item !== '')
            return api.post('/movie/register', {
                name: data.movieName,
                description: data.description,
                genreId: data.genre,
                cast
            },)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['useMovies']
            })
            toast({
                title: 'Sucesso!',
                description: 'Filme criado'
            })
            navigate('/')
        }
    })
    const onSubmit = (data: RegisterMovieSchema) => {

        mutate(data)
    };
    console.log(errors)
    return (
        <div className="min-h-screen flex-col">
            <Header />
            <div className="p-12">
                <h1 className="text-xl">
                    Cadastrar novo filme
                </h1>
                <section className="max-w-screen-sm">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2 mt-4">
                            <Label htmlFor="movieName">Nome do filme</Label>
                            <Input {...register('movieName')} error={errors.movieName?.message} />

                        </div>
                        <div className="space-y-2 mt-4">
                            <Label htmlFor="description">Descrição do filme</Label>
                            <Textarea id="description" {...register('description')} />
                            {errors.description && <p className="text-xs font-medium text-red-500 dark:text-red-400">{errors.description.message}</p>}
                        </div>
                        <div className="space-y-2 mt-4">
                            <Label htmlFor="genre">Gênero do filme</Label>
                            <ControlledSelect
                                name="genre"
                                control={control}
                                placeholder="Selecione um gênero"
                                label="Gênero do filme"
                                options={genres || []}
                            />
                            {errors.genre && <p className="text-xs font-medium text-red-500 dark:text-red-400">{errors.genre.message}</p>}
                        </div>

                        <div className="space-y-2 mt-4">
                            <Label>Elenco do filme</Label>
                            {fields.map((item, index) => (
                                <div key={item.id} className="flex space-x-2 items-center">
                                    <ControlledSelect
                                        name={`cast.${index}.id`}
                                        control={control}
                                        placeholder="Selecione um membro"
                                        label={`Membro ${index + 1}`}
                                        options={cast || []}
                                    />
                                    {index > 0 && (
                                        <button type="button" onClick={() => remove(index)} className="text-red-500">
                                            Remover
                                        </button>
                                    )}
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant='secondary'
                                onClick={() => append({ id: '', name: '' })}
                                className="mt-2"

                            >
                                Adicionar membro do elenco
                            </Button>
                            {errors.cast && <p className="text-xs font-medium text-red-500 dark:text-red-400">{errors.cast.message}</p>}
                        </div>

                        <Button type="submit" className="mt-12" disabled={isPending}>
                            Cadastrar Filme
                        </Button>
                    </form>
                </section>
            </div>
        </div>
    );
}
