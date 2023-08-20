import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const LandingPage = () => {
    const { user } = useAppSelector(state => state.auth);

    return (
        <div className="flex h-screen w-screen" style={{ zoom: 1 }}>
            <div className="relative bg-gradient-to-r from-indigo-900 to-red-600 py-24 px-6 text-center dark:bg-magenta-900">
                <div className="absolute inset-0 bg-opacity-75 bg-black" style={{ zIndex: -1 }}></div>
                <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text-white">
                    Construye tu Futuro Profesional con <strong>Modular</strong>
                </h1>
                <p className="mb-8 text-white">
                    ¡Bienvenido a <span className="text-primary font-semibold">Modular</span>, tu aliado en la exploración del siempre cambiante mercado laboral! Ya seas un <strong>profesional experimentado</strong> buscando dar el siguiente paso o un <em>recién graduado ansioso</em> por iniciar tu carrera, nuestra plataforma te conecta con <strong>ofertas de trabajo personalizadas</strong> que se ajustan a tus habilidades y aspiraciones. Di adiós al <em>desplazamiento interminable</em> y da la bienvenida a una <strong>forma más inteligente</strong> de buscar empleo. Únete a nosotros hoy mismo y <em>emprende un viaje</em> para encontrar el ajuste perfecto para tus talentos.
                </p>
                <Link className="border border-red-400 border-opacity-50 hover:bg-indigo-800 hover:bg-opacity-30 hover:border-opacity-100 hover:border-indigo-900 hover:border-opacity-20 rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" data-te-ripple-init data-te-ripple-color="light" to={user ? "/for-you" : '/login'} role="button">
                    INICIA TU BÚSQUEDA
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;