


import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { api } from '@/services/api'

import { useToast } from '@/components/ui/use-toast'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

const signInSchema = z.object({
    email: z.string({ message: 'E-mail é obrigatório' }).email({ message: 'Formato de e-mail invalido' }),
    password: z.string({ message: 'Senha é obrigatória' }).min(6, { message: 'Senha precisa ter no minimo 6 digitos' })
})
type SignInSchema = z.infer<typeof signInSchema>


export default function SignInPage() {
    const { toast } = useToast()
    const { login } = useAuth()
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema)
    })
    const { mutate } = useMutation({
        mutationFn: async ({ email, password }: SignInSchema) => {
            return api.post('/sessions', {
                email, password
            })
        },
        onSuccess: ({ data }) => {

            login(data)
            navigate('/')

        },
        onError: (err: any) => {

            if (err.response.data.message === "Wrong credentials") {
                console.log('caia auiq')

                toast({ description: 'Usuário ou senha invalidos', })
            }
        }

    })

    const onSubmit = (data: SignInSchema) => {
        mutate(data)
    }
    return (
        <form className="flex min-h-screen flex-col  justify-center px-4 max-w-screen-sm mx-auto">

            <h1 className='text-2xl text-center'>Login</h1>
            <div className="space-y-2 mt-4">
                <Label htmlFor="email" >E-mail</Label>
                <Input type="email" id="email" {...register('email')} error={errors.email?.message} />
            </div>

            <div className="space-y-2 mb-4" >
                <Label htmlFor="password">Senha</Label>
                <Input type="password" id="password" {...register('password')} error={errors.password?.message} />


            </div>
            <Button className="w-full" type="submit" onClick={handleSubmit(onSubmit)}>
                Entrar
            </Button>


            <Separator />


        </form>
    )
}