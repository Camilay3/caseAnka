import { FastifyInstance } from "fastify";
import { prisma } from "../server";
import { clienteSchema } from "../schemas/clienteSchema";

interface ClienteParams {
  id: string; // Na rota HTTP o id vem como string
}

export async function clienteRoutes(app: FastifyInstance) {
    app.get("/clientes", async () => {
        return await prisma.cliente.findMany(); // Busca todos os clientes
    });

    app.post("/clientes", async (request, reply) => {
        try {
            const data = clienteSchema.parse(request.body);
            const cliente = await prisma.cliente.create({ data }); // Cria um novo cliente
            reply.code(201).send(cliente);
        } catch (error) {
            reply.code(400).send(error);
        }
    });

    app.put<{ Params: ClienteParams }>("/clientes/:id", async (request, reply) => {
        const id = Number(request.params.id);
        if (isNaN(id)) {
            return reply.code(400).send({ error: "ID inválido" });
        }
        try {
            const data = clienteSchema.parse(request.body);
            const cliente = await prisma.cliente.update({ // Atualiza quando o id existe
                where: { id },
                data,
            });
            reply.send(cliente);
        } catch (error) {
            reply.code(400).send(error);
        }
    });

    app.delete<{ Params: ClienteParams }>("/clientes/:id", async (request, reply) => {
        const id = Number(request.params.id);
        if (isNaN(id)) {
            return reply.code(400).send({ error: "ID inválido" });
        }

        try {
            await prisma.cliente.delete({ where: { id } }); // Deleta quando o id é válido
            reply.code(204).send(); 
        } catch (error) {
            reply.code(400).send(error);
        }
    });
}