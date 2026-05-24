import { useState } from 'react'; // 1. Importamos useState para manejar los ojos
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const field = 'block w-full rounded-lg border border-cream-400 bg-cream-50 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-guinda focus:outline-none focus:ring-2 focus:ring-guinda/20 transition-colors pr-10'; // Nota: se agregó pr-10 para que el texto no tape el ojo

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', password: '', password_confirmation: '',
    });

    // 2. Definimos los estados para alternar ver/ocultar cada contraseña
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [mostrarConfirm, setMostrarConfirm] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    return (
        <GuestLayout>
            <Head title="Registro" />

            <h2 className="mb-5 text-lg font-bold text-gray-800">Crear cuenta</h2>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Nombre completo</label>
                    <input id="name" name="name" value={data.name} autoComplete="name" autoFocus onChange={(e) => setData('name', e.target.value)} required className={field} placeholder="Juan Pérez López" />
                    <InputError message={errors.name} className="mt-1.5" />
                </div>

                <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Correo Institucional</label>
                    <input id="email" type="email" name="email" value={data.email} autoComplete="username" onChange={(e) => setData('email', e.target.value)} required className={field} placeholder="ej: 20210001@tescha.edu.mx" />
                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                {/* 3. Bloque de Contraseña modificado */}
                <div>
                    <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Contraseña</label>
                    <div className="relative">
                        <input 
                            id="password" 
                            type={mostrarPassword ? 'text' : 'password'} 
                            name="password" 
                            value={data.password} 
                            autoComplete="new-password" 
                            onChange={(e) => setData('password', e.target.value)} 
                            required 
                            className={field} 
                            placeholder="••••••••" 
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                            onClick={() => setMostrarPassword(!mostrarPassword)}
                        >
                            {mostrarPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                {/* 4. Bloque de Confirmar Contraseña modificado */}
                <div>
                    <label htmlFor="password_confirmation" className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Confirmar contraseña</label>
                    <div className="relative">
                        <input 
                            id="password_confirmation" 
                            type={mostrarConfirm ? 'text' : 'password'} 
                            name="password_confirmation" 
                            value={data.password_confirmation} 
                            autoComplete="new-password" 
                            onChange={(e) => setData('password_confirmation', e.target.value)} 
                            required 
                            className={field} 
                            placeholder="••••••••" 
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                            onClick={() => setMostrarConfirm(!mostrarConfirm)}
                        >
                            {mostrarConfirm ? '🙈' : '👁️'}
                        </button>
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-1.5" />
                </div>

                <button type="submit" disabled={processing} className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-guinda py-2.5 text-sm font-semibold text-white transition-all hover:bg-guinda-700 active:scale-[0.98] disabled:opacity-60">
                    {processing ? 'Registrando...' : 'Crear cuenta →'}
                </button>

                <p className="text-center text-xs text-gray-400">
                    ¿Ya tienes cuenta?{' '}
                    <Link href={route('login')} className="text-guinda hover:underline">Iniciar sesión</Link>
                </p>
            </form>
        </GuestLayout>
    );
}
