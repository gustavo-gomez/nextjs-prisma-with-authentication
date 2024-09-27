import {z} from "zod";

export type SignInForm = {
  email: string;
  password: string;
}
export const signInDefaultValues: SignInForm = {
  email: '',
  password: '',
}

export const signInSchema = z.object({
  email: z.string().email('Ingrese un correo válido'),
  password: z.string().min(1, 'Ingrese una clave').min(8, 'La clave debe tener al menos 8 caracteres'),
})