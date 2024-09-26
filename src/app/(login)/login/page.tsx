'use client'
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Card} from '@nextui-org/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from "zod";
import FormInput from "@/components/FormInput";


type FormValues = {
  email: string;
  password: string;
}

export default function Login() {
  // const [state, action] = useFormState(login, undefined);

  const onSubmit = (data: FormValues) => console.log(data)

  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(z.object({
      email: z.string().email('Ingrese un correo válido'),
      password: z.string().min(1, 'Ingrese una clave').min(8, 'La clave debe tener al menos 8 caracteres'),
    })),
    mode: 'onBlur',
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="bg-white h-screen flex items-center justify-center w-full">
          <Card className=" flex flex-col gap-4 w-96 p-10">
            <FormInput
              name='email'
              label='Correo'
              placeholder='Ingrese su correo'
            />
            <FormInput
              name='password'
              label="Clave"
              placeholder="Ingrese su contraseña"

            />
            <Button type='submit'>Ingresar</Button>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
}