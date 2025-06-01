import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clienteSchema, ClientFormData } from '@/schemas/clienteSchema';

interface ClientFormProps {
    defaultValues?: ClientFormData;
    onSubmit: (data: ClientFormData) => void;
}

export function ClientForm({ defaultValues, onSubmit }: ClientFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ClientFormData>({
        resolver: zodResolver(clienteSchema),
        defaultValues,
    });

    // Sincroniza os valores do formulário com os defaultValues
    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col">
                <label htmlFor="nome" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                    Nome
                </label>
                <input
                    id="nome"
                    type="text"
                    {...register('nome')}
                    className="input bg-transparent dark:bg-gray-800 border-2 border-black dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2e1b45] dark:focus:ring-indigo-400"
                    placeholder="Digite o nome"
                />
                {errors.nome && (
                    <p className="mt-1 text-sm text-red-500">{errors.nome.message}</p>
                )}
            </div>

            <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 font-semibold text-gray-700 dark:text-gray-300">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="input bg-transparent dark:bg-gray-800 border-2 border-black dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2e1b45] dark:focus:ring-indigo-400"
                    placeholder="Digite o email"
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
            </div>

            <div className="flex items-center space-x-2">
                <input
                    id="status"
                    type="checkbox"
                    {...register('status')}
                    className="checkbox h-4 w-4 text-indigo-600 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2e1b45] dark:focus:ring-indigo-400"
                />
                <label htmlFor="status" className="font-medium text-gray-700 dark:text-gray-300">
                    Status (Ativo)
                </label>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-2 dark:text-white hover:bg-[#6e2194] dark:hover:bg-[#dbbfff] dark:hover:text-[#171717] border-1 border-black dark:border-white dark:hover:border-[#dbbfff] disabled:opacity-50 rounded-md transition cursor-pointer"
            >
                {isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
        </form>
    );
}
