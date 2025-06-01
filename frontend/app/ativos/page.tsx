'use client';

import { useQuery } from 'react-query';
import { api } from '@/lib/api';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

interface Ativo {
    id: number;
    nome: string;
    valor: number;
}

async function fetchAtivos() {
    const res = await api.get<Ativo[]>('/ativos');
    return res.data;
}

export default function AtivosPage() {
    const { data: ativos, isLoading, error } = useQuery('ativos', fetchAtivos);

    if (isLoading) return <p>Carregando ativos...</p>;
    if (error) return <p>Erro ao carregar ativos.</p>;

    return (
        <div className="border border-white border-solid rounded-xl w-full max-w-[50%] min-h-[600px] max-h-screen overflow-auto flex flex-col justify-between font-[family-name:var(--font-geist-sans)] px-4 sm:px-10 py-6 sm:py-10">
            <div className="flex flex-col items-center w-full">
                <h1 className="text-xl mb-6 text-center">Ativos</h1>
                <div className="hidden sm:grid grid-cols-[2fr_1fr] w-full border-b border-gray-300 pb-2 mb-4 text-sm font-semibold text-gray-100 gap-4">
                    <p>Nome</p>
                    <p>Valor</p>
                </div>

                <div className="w-full">
                    {ativos!.map((ativo) => (
                        <div key={ativo.id} className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4 w-full border-b border-gray-200 py-2 text-sm text-white">
                            
                            <p><span className="sm:hidden font-semibold">Nome: </span>{ativo.nome}</p>
                            <p>R$ <span className="sm:hidden font-semibold">Valor: </span>{ativo.valor}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center flex-wrap gap-4 mt-8">
                <Button asChild variant="ghost">
                    <Link href="/"><MoveLeft className="mr-2" />Voltar</Link>
                </Button>
            </div>
        </div>
    );
}