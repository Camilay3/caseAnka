import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { clienteRoutes } from "./routes/clienteRoutes";
import { ativosRoutes } from "./routes/ativosRoutes";
import { clienteAtivoRoutes } from "./routes/clienteAtivoRoutes";

const app = Fastify({ logger: true });
const prisma = new PrismaClient();

app.register(clienteRoutes);
app.register(ativosRoutes);
app.register(clienteAtivoRoutes);
export { app, prisma };

const start = async () => {
  try {
    await app.listen({ port: 3001, host: "0.0.0.0" });
    console.log("Servidor rodando na porta 3001");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();