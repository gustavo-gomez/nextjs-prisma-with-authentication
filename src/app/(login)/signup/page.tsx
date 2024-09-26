'use client'
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Card} from '@nextui-org/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from "zod";
import FormInput from "@/components/FormInput";
import {useFormState} from 'react-dom';
import {signUp} from "@/app/(login)/actions";

export type SignUpForm = {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [state, action] = useFormState(signUp, undefined);

  const methods = useForm({
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(z.object({
      name: z.string().min(1, 'Ingrese sus nombres'),
      lastName: z.string().min(1, 'Ingrese sus apellidos'),
      email: z.string().email('Ingrese un correo válido'),
      password: z.string().min(1, 'Ingrese una clave').min(8, 'La clave debe tener al menos 8 caracteres'),
      confirmPassword: z.string().min(1, 'Ingrese la confirmación de la clave').min(8, 'La clave debe tener al menos 8 caracteres'),
    })),
    mode: 'onBlur',
  });

  console.log('state: ', state)
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(action)}>
        <div className="bg-white h-screen flex items-center justify-center w-full">
          <Card className=" flex flex-col gap-4 w-96 p-10">
            <FormInput
              name='name'
              label='Nombres'
            />
            <FormInput
              name='lastName'
              label='Apellidos'
            />
            <FormInput
              name='email'
              label='Correo'
            />
            <FormInput
              name='password'
              label="Clave"
            />
            <FormInput
              name='confirmPassword'
              label="Confirme la Clave"
            />
            <Button type='submit'>Registrarse</Button>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
}