import { FastifyInstance } from "fastify";
import { prisma } from "../server";
import { ativosSchema } from "../schemas/ativosSchema";

export async function ativosRoutes(app: FastifyInstance) {
  app.get("/ativos", async (_request, reply) => {
    return await prisma.ativo.findMany();
  });

  app.post("/ativos", async (request, reply) => {
    try {
      const data = ativosSchema.parse(request.body);
      const ativo = await prisma.ativo.create({ data });
      reply.code(201).send(ativo);
    } catch (error) {
      reply.code(400).send(error);
    }
  });
}
