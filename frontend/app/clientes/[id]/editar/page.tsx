'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ClientFormData } from '@/schemas/clienteSchema';
import { ClientForm } from '@/components/ClientForm';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function EditarClientePage() {
    const params = useParams();
    const id = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : undefined; // Garante que o id seja string

    if (!id) {
        return <p>ID inválido ou não informado</p>;
    }
    const router = useRouter();
    const [cliente, setCliente] = useState<ClientFormData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCliente() {
            const res = await fetch(`${API_URL}/clientes/${id}`);
            const data = await res.json();

            const clienteFormatado = {
                nome: data.name || data.nome,
                email: data.email,
                status: data.status,
            };

            setCliente(clienteFormatado);
            setLoading(false);
        }

        fetchCliente();
    }, [id]);

    async function handleSubmit(data: ClientFormData) {
        await fetch(`${API_URL}/clientes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        router.push(`/clientes/${id}`);
    }

    if (loading) return <p>Carregando...</p>;
    if (!cliente) return <p>Cliente não encontrado</p>;

    return (
        <div className="border-black border-1 dark:border-white border-solid rounded-xl w-full max-w-[30%] min-h-[400px] max-h-screen overflow-auto flex flex-col justify-between font-[family-name:var(--font-geist-sans)] px-4 sm:px-10 py-6 sm:py-10">
            <div className="flex flex-col items-center w-full">
                <h1 className="text-2xl font-bold mb-4">Editar Cliente</h1>
                <ClientForm defaultValues={cliente} onSubmit={handleSubmit} />
            </div>
        </div>
    );
}