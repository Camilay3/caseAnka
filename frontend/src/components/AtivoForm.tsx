import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ativosSchema, AtivoFormData } from '@/schemas/ativosSchema';

interface AtivoFormProps {
    defaultValues?: AtivoFormData;
    onSubmit: (data: AtivoFormData) => void;
}

export function AtivoForm({ defaultValues, onSubmit }: AtivoFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AtivoFormData>({
        resolver: zodResolver(ativosSchema),
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label>Nome</label>
                <input {...register('nome')} className="input" />
                {errors.nome && <p className="error">{errors.nome.message}</p>}
            </div>

            <div>
                <label>Valor</label>
                <input type="number" {...register('valor', { valueAsNumber: true })} className="input" />
                {errors.valor && <p className="error">{errors.valor.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary">
                Salvar
            </button>
        </form>
    );
}