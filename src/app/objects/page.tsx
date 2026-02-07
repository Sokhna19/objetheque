import { prisma } from '@/lib/prisma';

interface ObjectsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Objects({ searchParams }: ObjectsPageProps) {
  const params = await searchParams;
  const category = params.category;
  const subCategory = params.subCategory;

  const where: any = {};
  if (category) {
    if (Array.isArray(category)) {
      where.category = { in: category };
    } else {
      where.category = category;
    }
  }
  if (subCategory) {
    if (Array.isArray(subCategory)) {
      where.subCategory = { in: subCategory };
    } else {
      where.subCategory = subCategory;
    }
  }

  const objects = await prisma.object.findMany({
    where,
    include: { owner: true },
  });

  // Get unique categories with counts
  const categoryCounts = await prisma.object.groupBy({
    by: ['category'],
    _count: { category: true },
    where: { category: { not: null } },
  });

  const subCategoryCounts = await prisma.object.groupBy({
    by: ['subCategory'],
    _count: { subCategory: true },
    where: { subCategory: { not: null } },
  });

  const categories = categoryCounts.map((c: { category: string | null; _count: { category: number } }) => ({ name: c.category, count: c._count.category }));
  const subCategories = subCategoryCounts.map((c: { subCategory: string | null; _count: { subCategory: number } }) => ({ name: c.subCategory, count: c._count.subCategory }));

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <h1 className="text-3xl font-semibold text-black dark:text-zinc-50 mb-6">Objects</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-4">Browse available objects for reservation.</p>
      <div className="flex">
        {/* Filters Sidebar */}
        <div className="w-64 pr-8">
          <h2 className="text-lg font-medium mb-4">Filtres</h2>
          <form method="get" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Catégories</label>
              <div className="space-y-2">
                {categories.map((cat: { name: string | null; count: number }) => (
                  <label key={cat.name} className="flex items-center">
                    <input
                      type="checkbox"
                      name="category"
                      value={cat.name ?? ""}
                      defaultChecked={cat.name !== null && (Array.isArray(category) ? category.includes(cat.name) : category === cat.name)}
                      className="mr-2"
                    />
                    {cat.name} ({cat.count})
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sous-catégories</label>
              <div className="space-y-2">
                {subCategories.map((sub: { name: string | null; count: number }) => (
                  <label key={sub.name} className="flex items-center">
                    <input
                      type="checkbox"
                      name="subCategory"
                      value={sub.name ?? ""}
                      defaultChecked={sub.name !== null && (Array.isArray(subCategory) ? subCategory.includes(sub.name) : subCategory === sub.name)}
                      className="mr-2"
                    />
                    {sub.name} ({sub.count})
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded">Filtrer</button>
          </form>
        </div>
        {/* Objects Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {objects.map((obj: any) => (
            <div key={obj.id} className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
              <h2 className="text-xl font-medium">{obj.name}</h2>
              <p>{obj.description}</p>
              <p>Catégorie: {obj.category}</p>
              <p>Sous-catégorie: {obj.subCategory}</p>
              <p>Status: {obj.status}</p>
              <button className={`mt-2 px-4 py-2 rounded ${obj.status === 'available' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`} disabled={obj.status !== 'available'}>
                {obj.status === 'available' ? 'Reserve' : 'Unavailable'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}