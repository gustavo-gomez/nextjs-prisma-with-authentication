'use client'
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Card} from '@nextui-org/react';
import {zodResolver} from '@hookform/resolvers/zod';
import FormInput from "@/components/FormInput";
import {useFormState} from 'react-dom';
import {signUp} from "@/app/(login)/actions";
import {signUpDefaultValues, signUpSchema} from "@/app/(login)/signup/signUpHelper";

export default function SignUp() {
  const [state, action] = useFormState(signUp, undefined);

  const methods = useForm({
    defaultValues: signUpDefaultValues,
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });

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
              type='password'
            />
            <FormInput
              name='confirmPassword'
              label="Confirme la Clave"
              type='password'
            />
            <Button type='submit'>Registrarse</Button>
            <span className='text-red-600'>{state?.message}</span>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
}