'use client'
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Card} from '@nextui-org/react';
import {zodResolver} from '@hookform/resolvers/zod';
import FormInput from "@/components/FormInput";
import {signInDefaultValues, signInSchema} from "@/app/(login)/login/signInHelper";
import {useFormState} from "react-dom";
import {login} from "@/app/(login)/actions";

export default function Login() {
  const [state, action] = useFormState(login, undefined);

  const methods = useForm({
    defaultValues: signInDefaultValues,
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(action)}>
        <div className="bg-white h-screen flex items-center justify-center w-full">
          <Card className=" flex flex-col gap-4 w-96 p-10">
            <FormInput
              name='email'
              label='Correo'
            />
            <FormInput
              name='password'
              label="Clave"
              type='password'
            />
            <Button type='submit'>Ingresar</Button>
            <span className='text-red-600'>{state?.message}</span>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
}