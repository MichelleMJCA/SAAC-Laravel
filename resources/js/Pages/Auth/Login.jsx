import { useState } from 'react'; // 1. Importamos useState para controlar el ojo
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

// Se añadió pr-10 al final de los estilos para que el texto no tape el emoji
const field = 'block w-full rounded-lg border border-cream-400 bg-cream-50 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-guinda focus:outline-none focus:ring-2 focus:ring-guinda/20 transition-colors pr-10';

const ROLES = [
    { value: 'alumno',         label: 'Estudiante' },
    { value: 'docente',        label: 'Docente' },
    { value: 'administrador', label: 'Admin' },
];

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // 2. Estado para alternar ver/ocultar la contraseña
    const [mostrarPassword, setMostrarPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar Sesión" />

            {status && (
                <div className="mb-4 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700">
                    {status}
                </div>
            )}

            {/* Tabs de rol se mantienen intactos */}
            <div className="mb-6 flex rounded-lg bg-cream-200 p-1">
                {ROLES.map((r) => (
                    <button
                        key={r.value}
                        type="button"
                        className="flex-1 rounded-md py-1.5 text-xs font-semibold transition-all duration-150 text-gray-500 hover:text-gray-700"
                    >
                        {r.label}
                    </button>
                ))}
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                        Número de Control o Correo Institucional
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="ej: 20210001@tescha.edu.mx"
                        className={field}
                    />
                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                {/* 3. Bloque de Contraseña modificado con el ojo interactivo */}
                <div>
                    <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                        Contraseña
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={mostrarPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                            className={field}
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

                {canResetPassword && (
                    <div className="text-right">
                        <Link
                            href={route('password.request')}
                            className="text-xs text-gray-400 hover:text-guinda transition-colors"
                        >
                            Olvidé mi contraseña
                        </Link>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={processing}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-guinda py-2.5 text-sm font-semibold text-white transition-all hover:bg-guinda-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {processing ? 'Iniciando sesión...' : 'Iniciar Sesión →'}
                </button>
            </form>

            <p className="mt-5 text-center text-xs text-gray-400">
                ¿Problemas para acceder?{' '}
                <a href="mailto:soporte@tescha.edu.mx" className="text-guinda hover:underline">
                    Soporte Técnico
                </a>
            </p>
        </GuestLayout>
    );
}