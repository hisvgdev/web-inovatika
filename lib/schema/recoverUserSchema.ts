import { z } from "zod";

export const recoverUserSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Данное поля является обязательным к заполнению!' })
    .email({ message: 'Почта некорректна' }),
})

export type RecoverUserPayload = z.infer<typeof recoverUserSchema>