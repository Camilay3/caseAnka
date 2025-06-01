'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft, Pen } from "lucide-react";
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Ativo {
    id: number;
    nome: string;
    quantidade: number;
    valor: number;
}

interface Cliente {
    id: number;
    nome: string;
    email: string;
    status: boolean;
    alocacoes: Ativo[];
}

export default function ClienteDetalhesPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : undefined;

    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        async function fetchCliente() {
            try {
                const res = await fetch(`${API_URL}/clientes/${id}`);
                const data = await res.json();
                setCliente(data);
            } catch (error) {
                console.error('Erro ao buscar cliente:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCliente();
    }, [id]);

    if (loading) return <p>Carregando...</p>;
    if (!cliente) return <p>Cliente não encontrado.</p>;

    return (
        <div className="border-black border-1 dark:border-white border-solid rounded-xl w-full max-w-3xl min-h-[600px] max-h-screen overflow-auto flex flex-col justify-between font-[family-name:var(--font-geist-sans)] px-6 sm:px-10 py-6 sm:py-10">
            <div className="flex flex-col items-center w-full">
                <h1 className="text-xl mb-6 text-center">Detalhes do Cliente</h1>

                <div className="w-full max-w-3xl mb-6">
                    <p><strong>ID:</strong> {cliente.id}</p>
                    <p><strong>Nome:</strong> {cliente.nome}</p>
                    <p><strong>Email:</strong> {cliente.email}</p>
                    <p><strong>Status:</strong> {cliente.status ? 'Ativo' : 'Inativo'}</p>
                </div>

                <h2 className="w-full max-w-3xl text-lg font-semibold mb-2">Ativos Financeiros</h2>

                <div className="w-full max-w-3xl border-b border-black dark:border-white dark:border-gray-300 pb-2 mb-4 text-sm font-semibold dark:text-gray-100 grid grid-cols-[2fr_1fr_1fr] gap-4">
                    <p>Nome</p>
                    <p>Quantidade</p>
                    <p>Valor</p>
                </div>

                <div className="w-full max-w-3xl">
                    {cliente.alocacoes?.length ? (
                        cliente.alocacoes.map((aloc: any) => (
                            <div
                                key={aloc.id}
                                className="grid grid-cols-[2fr_1fr_1fr] gap-4 w-full border-b border-black dark:border-white dark:border-gray-300 py-2 text-sm dark:text-white"
                            >
                                <p>{aloc.ativo.nome}</p>
                                <p>{aloc.quantidade}</p>
                                <p>R$ {aloc.ativo.valor}</p>
                            </div>
                        ))
                    ) : (
                        <p>Este cliente não possui ativos alocados.</p>
                    )}
                </div>
            </div>

            <div className="flex justify-center flex-wrap gap-4 mt-8">
                <Button asChild variant="ghost">
                    <Link href="/clientes"><MoveLeft className="mr-2" />Voltar</Link>
                </Button>
                <Button asChild variant="ghost">
                    <Link href={`/clientes/${cliente.id}/editar`}><Pen /> Editar</Link>
                </Button>
            </div>
        </div>
    );
}