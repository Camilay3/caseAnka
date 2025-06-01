import { FastifyInstance } from "fastify";
import { prisma } from "../server";
import { clienteSchema } from "../schemas/clienteSchema";
import { ZodError } from 'zod';

interface ClienteParams {
    id: string; // Na rota HTTP o id vem como string
}

interface ClienteBody {
    nome: string;
    email: string;
    status: boolean;
}

export async function clienteRoutes(app: FastifyInstance) {
    app.get("/clientes", async () => {
        return await prisma.cliente.findMany(); // Busca todos os clientes
    });

    app.post<{ Body: ClienteBody }>("/clientes", async (request, reply) => {
        try {
            const data = clienteSchema.parse(request.body);
            const cliente = await prisma.cliente.create({ data });
            reply.code(201).send(cliente);
        } catch (error: any) {
            if (error instanceof ZodError) {
                return reply.status(400).send({ message: 'Dados inválidos', errors: error.errors });
            }

            if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
                return reply.status(400).send({ message: 'E-mail já está em uso' });
            }

            if (error?.name === 'ZodError') {
                return reply.status(400).send({ message: 'Dados inválidos', errors: error.errors });
            }

            return reply.status(500).send({ message: 'Erro interno do servidor' });
        }
    });

    app.get<{ Params: { id: number } }>('/clientes/:id', async (request, reply) => {
        const id = Number(request.params.id);
        if (isNaN(id)) {
            return reply.code(400).send({ error: 'ID inválido' });
        }

        const cliente = await prisma.cliente.findUnique({
            where: { id },
            include: {
                alocacoes: {
                    include: {
                        ativo: true, // Nome e valor do(s) ativo(s) relacionado
                    },
                },
            },
        });

        if (!cliente) {
            return reply.code(404).send({ error: 'Cliente não encontrado' });
        }

        reply.send(cliente);
    });

    app.put<{ Params: ClienteParams; Body: ClienteBody }>("/clientes/:id", async (request, reply) => {
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