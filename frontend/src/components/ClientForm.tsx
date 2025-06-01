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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label>Nome</label>
                <input {...register('nome')} className="input" />
                {errors.nome && <p className="error">{errors.nome.message}</p>}
            </div>
            <div>
                <label>Email</label>
                <input {...register('email')} className="input" />
                {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" {...register('status')} className="checkbox" />
                    <span>Status (Ativo)</span>
                </label>
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary">
                Salvar
            </button>
        </form>
    );
}
