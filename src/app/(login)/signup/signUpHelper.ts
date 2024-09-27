import {z} from "zod";

export type SignUpForm = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export const signUpDefaultValues: SignUpForm = {
  name: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export const signUpSchema = z.object({
  name: z.string().min(1, 'Ingrese sus nombres'),
  lastName: z.string().min(1, 'Ingrese sus apellidos'),
  email: z.string().email('Ingrese un correo válido'),
  password: z.string()
    .min(1, 'Ingrese una clave')
    .min(8, 'La clave debe tener al menos 8 caracteres')
    .min(20, 'La clave debe tener menos de 20 caracteres')
    .regex(/[a-zA-Z]/, 'Contain at least one letter.')
    .regex(/[0-9]/, 'Contain at least one number.')
    .regex(/[^a-zA-Z0-9]/, 'Contain at least one special character.').trim(),
  confirmPassword: z.string()
    .min(1, 'Vuelva a ingresar su clave')
    .min(8, 'La clave debe tener al menos 8 caracteres').trim()
})
  .superRefine(({password, confirmPassword}, ctx) => {
    if (password !== confirmPassword) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'Las claves no coinciden',
      });
    }
  });