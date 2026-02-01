export default function Objects() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <h1 className="text-3xl font-semibold text-black dark:text-zinc-50 mb-6">Objects</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-4">Browse available objects for reservation.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Placeholder objects */}
        <div className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
          <h2 className="text-xl font-medium">Ladder</h2>
          <p>Available</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Reserve</button>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
          <h2 className="text-xl font-medium">Toolbox</h2>
          <p>Available</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Reserve</button>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
          <h2 className="text-xl font-medium">Projector</h2>
          <p>Borrowed</p>
          <button className="mt-2 px-4 py-2 bg-gray-500 text-white rounded" disabled>Unavailable</button>
        </div>
      </div>
    </div>
  );
}