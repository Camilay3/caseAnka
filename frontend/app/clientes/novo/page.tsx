'use client';
import { useMutation, useQueryClient } from 'react-query';
import { ClientForm } from '@/components/ClientForm';
import { api } from '@/lib/api';
import { ClientFormData } from '@/schemas/clienteSchema';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

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
        <div className="border border-black dark:border-white rounded-xl w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl min-h-[400px] max-h-screen overflow-auto flex flex-col justify-between font-[family-name:var(--font-geist-sans)] px-4 sm:px-10 py-6 sm:py-10">
            <div className="flex flex-col items-center w-full">
                <h1 className="text-2xl font-bold mb-4">Novo Cliente</h1>
                <ClientForm onSubmit={onSubmit} />
                {mutation.isError && (
                    <p className="text-red-500 mt-2">
                        {(mutation.error as any)?.response?.data?.message || 'Erro ao salvar cliente.'}
                    </p>
                )}
                <Button variant="link" className="mt-2 dark:text-white cursor-pointer" onClick={() => router.back()}>Voltar</Button>
            </div>
        </div>
    );
}