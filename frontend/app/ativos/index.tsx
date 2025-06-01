import { useQuery } from 'react-query';
import { api } from '@/lib/api';

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
        <div>
            <h1>Ativos</h1>
            <a href="/ativos/novo" className="btn-primary">Novo Ativo</a>
            <ul>
                {ativos!.map(ativo => (
                    <li key={ativo.id}>
                        {ativo.nome} — {ativo.valor}
                    </li>
                ))}
            </ul>
        </div>
    );
}