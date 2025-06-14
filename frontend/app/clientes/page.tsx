'use client';

import { useQuery } from 'react-query';
import { api } from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Plus, MoveLeft, Eye, Pen } from "lucide-react";
import Link from "next/link";

interface Cliente {
    id: number;
    nome: string;
    email: string;
    status: boolean;
}

async function fetchClients() {
    const res = await api.get<Cliente[]>('/clientes');
    return res.data;
}

export default function ClientsPage() {
    const { data: clientes, isLoading, error } = useQuery('clients', fetchClients);

    if (isLoading) return <p>Carregando clientes...</p>;
    if (error) return <p>Erro ao carregar clientes.</p>;

    return (
        <div className="border-black border-1 dark:border-white border-solid rounded-xl w-full max-w-[80%] min-h-[600px] flex flex-col justify-between font-[family-name:var(--font-geist-sans)] px-4 sm:px-10 py-6 sm:py-10">
            <div className="flex flex-col items-center w-full">
                <h1 className="text-xl mb-6 text-center">Clientes</h1>
                <div className="hidden sm:grid grid-cols-[2fr_3fr_1fr] w-full border-b border-black dark:border-white dark:border-gray-300 pb-2 mb-4 text-sm font-semibold dark:text-gray-100 gap-4">
                    <p>Nome</p>
                    <p>Email</p>
                    <p className="text-center">Status</p>
                </div>

                <div className="w-full max-h-[50vh] overflow-auto">
                    {clientes!.map((cliente) => (
                        <div key={cliente.id} className="grid grid-cols-1 sm:grid-cols-[2fr_3fr_1fr] gap-4 w-full border-b border-black dark:border-white dark:border-gray-200 text-sm dark:text-white p-2">
                            <p>
                                <Button variant="link" size="icon" className="cursor-pointer dark:text-white size-2 mr-4">
                                    <Link href={`/clientes/${cliente.id}`}><Eye /></Link>
                                </Button>
                                <Button variant="link" size="icon" className="cursor-pointer dark:text-white size-2 mr-4">
                                    <Link href={`/clientes/${cliente.id}/editar`}><Pen /></Link>
                                </Button>
                                <span className="sm:hidden font-semibold">Nome: </span>{cliente.nome}</p>
                            <p><span className="sm:hidden font-semibold">Email: </span>{cliente.email}</p>
                            <p className="text-center">
                                <span className="sm:hidden font-semibold">Status: </span>{cliente.status ? 'Ativo' : 'Inativo'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center flex-wrap gap-4 mt-8">
                <Button asChild variant="ghost">
                    <Link href="/"><MoveLeft className="mr-2" />Voltar</Link>
                </Button>
                <Button asChild variant="ghost">
                    <Link href="/clientes/novo"><Plus className="mr-2" />Novo Cliente</Link>
                </Button>
            </div>
        </div>
    );
}