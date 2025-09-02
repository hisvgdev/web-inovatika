import { z } from "zod";

export const changePassSchema = z.object({
  email: z.string().email("Неверный формат почты!"),
  password: z.string(),
  repeatPassword: z.string(),
}).refine(
  (data) => data.password === data.repeatPassword, {
  message: 'Пароли не совпадают',
  path: ['repeatPassword']
}
)

export type ChangePassType = z.infer<typeof changePassSchema>