import { useMutation, useQueryClient } from 'react-query';
import { ClientForm } from '@/components/ClientForm';
import { api } from '@/lib/api';
import { ClientFormData } from '@/schemas/clienteSchema';
import { useRouter } from 'next/navigation';

export default function NewClientPage() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation(
        (newClient: ClientFormData) => api.post('/clientes', newClient),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('clientes');
                router.push('/clientes');
            },
            onError: (error) => {
                console.log('Erro ao salvar cliente:', error);
            }
        }
    );

    function onSubmit(data: ClientFormData) {
        mutation.mutate(data);
    }

    return (
        <div>
            <h1>Novo Cliente</h1>
            <ClientForm onSubmit={onSubmit} />
            {mutation.isError && (
                <p className="text-red-500 mt-2">
                    {(mutation.error as any)?.response?.data?.message ||
                        'Erro ao salvar cliente.'}
                </p>
            )}
        </div>
    );
}