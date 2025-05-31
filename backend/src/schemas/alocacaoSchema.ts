import { z } from "zod";

export const alocacaoSchema = z.object({
    ativoId: z.number(),
    quantidade: z.number().positive(),
});