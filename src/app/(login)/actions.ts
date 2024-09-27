'use server';

import {FormState} from "@/app/actions/auth/definitions";
import prisma from "@/lib/prisma";
import {SignUpForm} from "@/app/(login)/signup/signUpHelper";
import {createSession, deleteSession} from "@/lib/auth/session";

export async function signUp(state: FormState, values: SignUpForm): Promise<FormState> {

  const existingUser = await prisma.user.findFirst({
    where: {
      email: values.email
    }
  })
  if (existingUser) {
    return {
      message: 'El email ya existe, por favor use un email diferente o inicie sesión'
    }
  }

  // insert the user into the database
  const user = await prisma.user.create({
    data: {
      name: values.name,
      lastname: values.lastName,
      email: values.email,
      password: values.password
    }
  })
  if (!user) return {message: 'Error al crear el usuario'}

  await createSession(user.id.toString())

  return {
    message: 'Usuario creado con éxito'
  }
}

export async function logout() {
  deleteSession();
}
