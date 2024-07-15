import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGenres } from "@/hooks/useGenres";
import { Label } from "@radix-ui/react-label";
import { Select } from "@radix-ui/react-select";
import { useForm } from "react-hook-form";

export function RegisterMovie() {
    const { register, handleSubmit, formState: { errors } } = useForm({

    })
    const { data } = useGenres()
    console.log(data)
    return (
        <div className=" min-h-screen flex-col  ">
            <Header />
            <div className="p-12">
                <h1 className="text-xl">
                    Cadastar novo filme
                </h1>
                <section className="max-w-screen-sm">
                    <div className="space-y-2 mt-4">
                        <Label htmlFor="email" >Nome do filme</Label>
                        <Input type="email" id="email" {...register('email')} />
                    </div>
                    <div className="space-y-2 mt-4">
                        <Label htmlFor="email" >Descrição do filme</Label>
                        <Textarea />
                    </div>
                    <div className="space-y-2 mt-4">
                        <Label htmlFor="email" >Descrição do filme</Label>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecione um genero" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Gênero do filme</SelectLabel>
                                    {
                                        data?.map((item) => (
                                            <SelectItem value={item.id}>{item.name}</SelectItem>
                                        ))
                                    }


                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </section>

            </div>
        </div>
    )
}