'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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

    cliente.alocacoes.map((alocacao: any) => (
        console.log(alocacao, alocacao.nome)
    ))

    return (
        <div className="max-w-xl mx-auto space-y-4">
            <h1 className="text-2xl font-bold">Detalhes do Cliente</h1>
            <p><strong>ID:</strong> {cliente.id}</p>
            <p><strong>Nome:</strong> {cliente.nome}</p>
            <p><strong>Email:</strong> {cliente.email}</p>
            <p><strong>Status:</strong> {cliente.status ? 'Ativo' : 'Inativo'}</p>
            <p>Ativos Financeiros:</p>
            <ul>
                {cliente.alocacoes?.length ? (
                    cliente.alocacoes.map((aloc: any) => (
                        <li key={aloc.id}>
                            {aloc.ativo.nome} — {aloc.quantidade} unidades — R$ {aloc.ativo.valor.toFixed(2)}
                        </li>
                    ))
                ) : (
                    <li>Este cliente não possui ativos alocados.</li>
                )}
            </ul>

            <div className="space-x-4 mt-4">
                <button onClick={() => router.push(`/clientes/${id}/editar`)} className="btn-primary">
                    Editar
                </button>
                <button onClick={() => router.push('/clientes')} className="btn-secondary">
                    Voltar
                </button>
            </div>
        </div>
    );
}