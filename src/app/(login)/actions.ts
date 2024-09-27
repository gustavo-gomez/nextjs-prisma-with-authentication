'use server';

import {FormState} from "@/app/actions/auth/definitions";
import prisma from "@/lib/prisma";
import {SignUpForm} from "@/app/(login)/signup/signUpHelper";
import {createSession, deleteSession} from "@/lib/auth/session";
import bcrypt from 'bcrypt';
import {SignInForm} from "@/app/(login)/login/signInHelper";

export async function login(state: FormState, values: SignInForm): Promise<FormState> {
  const user = await prisma.user.findFirst({
    where: {
      email: values.email
    }
  })
  if (!user) {
    return {
      message: 'Usuario o clave incorrecta'
    }
  }
  const passwordMatch = bcrypt.compare(values.password, user?.password || '')
  if (!passwordMatch) {
    return {
      message: 'Usuario o clave incorrectaa'
    }
  }
  await createSession(user.id.toString())
  return {
    message: 'Inicio de sesión exitoso'
  }
}

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
  const hashedPassword = await bcrypt.hash(values.password, 10);

  const user = await prisma.user.create({
    data: {
      name: values.name,
      lastname: values.lastName,
      email: values.email,
      password: hashedPassword
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
