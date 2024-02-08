import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            404 - Página No Encontrada
          </h2>
        </div>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            La página que estás buscando podría haber sido eliminada, cambiar su nombre o estar temporalmente no disponible.
          </p>
          <a href="/" className="mt-2 text-sm text-blue-600">
            Volver a la página de inicio
          </a>
        </div>
      </div>
    </div>
  );
}