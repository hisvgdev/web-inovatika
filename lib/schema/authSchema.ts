import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Данное поля является обязательным к заполнению!' })
    .email({ message: 'Почта обязательная' }),
  password: z.string().min(3, { message: 'Пароль не должен быть меньше 3 символов' }),
})

export type AuthPayload = z.infer<typeof authSchema>