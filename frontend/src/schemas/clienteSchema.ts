import { z } from 'zod';

export const clienteSchema = z.object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    status: z.boolean(),
});

export type ClientFormData = z.infer<typeof clienteSchema>;
