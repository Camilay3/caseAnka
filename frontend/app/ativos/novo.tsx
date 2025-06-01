import { useMutation, useQueryClient } from 'react-query';
import { AtivoForm } from '@/components/AtivoForm';
import { api } from '@/lib/api';
import { AtivoFormData } from '@/schemas/ativosSchema';
import { useRouter } from 'next/router';

export default function NewAtivoPage() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation(
        (newAtivo: AtivoFormData) => api.post('/ativos', newAtivo),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('ativos');
                router.push('/ativos');
            },
            onError: (error) => {
                console.log('Erro ao salvar ativo:', error);
            }
        }
    );

    function onSubmit(data: AtivoFormData) {
        mutation.mutate(data);
    }

    return (
        <div>
            <h1>Novo Ativo</h1>
            <AtivoForm onSubmit={onSubmit} />
            {mutation.isError && (
                <p className="text-red-500 mt-2">
                    {(mutation.error as any)?.response?.data?.message ||
                        'Erro ao salvar ativo.'}
                </p>
            )}
        </div>
    );
}