import { z } from "zod";

export const ativosSchema = z.object({
    nome: z.string(),
    valor: z.number(),
});

export type AtivoFormData = z.infer<typeof ativosSchema>;
