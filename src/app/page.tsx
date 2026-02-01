import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Bienvenue dans la Bibliothèque d'Objets
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Gérez et réservez des objets partagés pour l'association. Découvrez une collection d'outils, d'équipements et de ressources disponibles pour tous les membres.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
          <a
            href="/objects"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            Parcourir les Objets
          </a>
          <a
            href="/login"
            className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-lg border border-blue-600 transition duration-300 transform hover:scale-105"
          >
            Se Connecter
          </a>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Outils Disponibles</h3>
            <p className="text-gray-600 dark:text-gray-300">Accédez à une variété d'outils pour vos projets.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Réservations Faciles</h3>
            <p className="text-gray-600 dark:text-gray-300">Réservez en quelques clics et suivez vos emprunts.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Communauté</h3>
            <p className="text-gray-600 dark:text-gray-300">Partagez des ressources avec les membres de l'association.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
