import { FastifyInstance } from "fastify";
import { prisma } from "../server";
import { alocacaoSchema } from "../schemas/alocacaoSchema";

export async function clienteAtivoRoutes(app: FastifyInstance) {
    app.get<{ Params: { id: string } }>("/clientes/:id/ativos", async (request, reply) => {
        const clienteId = Number(request.params.id);
        if (isNaN(clienteId)) return reply.code(400).send({ error: "ID inválido" });

        const alocacoes = await prisma.alocacao.findMany({
            where: { clienteId },
            include: { ativo: true }, // traz os dados do ativo
        });

        reply.send(alocacoes);
    });

    app.post<{ Params: { id: string } }>("/clientes/:id/ativos", async (request, reply) => {
        const clienteId = Number(request.params.id);
        if (isNaN(clienteId)) return reply.code(400).send({ error: "ID inválido" });

        try {
            const data = alocacaoSchema.parse(request.body);
            const alocacao = await prisma.alocacao.create({
                data: {
                    clienteId,
                    ativoId: data.ativoId,
                    quantidade: data.quantidade,
                },
            });
            reply.code(201).send(alocacao);
        } catch (error) {
            reply.code(400).send(error);
        }
    });
}
