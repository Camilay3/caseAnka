import { useQuery } from 'react-query';
import { api } from '@/lib/api';
import Link from 'next/link';

interface Cliente {
    id: number;
    name: string;
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
        <div>
            <h1>Clientes</h1>
            <a href="/clientes/novo" className="btn-primary">Novo Cliente</a>
            <ul>
                {clientes!.map(cliente => (
                    <li key={cliente.id}>
                        {cliente.name} — {cliente.email} — {cliente.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}